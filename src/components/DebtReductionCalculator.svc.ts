import { CalculatorStrategyEnum } from "../enums/CalculatorStrategyEnum";
import { TPaymentDataRow, TCalculatorInputRow, TPayoffDataRow, TTotals } from "../types/calculatorTypes";
import _ from 'lodash';

export const sumField = (data: TCalculatorInputRow[], field: keyof TCalculatorInputRow): number => {
  if (field === 'creditor') return 0;
  let sum = 0;
  for (const item of data) {
    sum += item[field] ?? 0;
  }

  return sum;
};

export const calculatePayoffData = (calculatorData: TCalculatorInputRow[], strategy: CalculatorStrategyEnum, budget: number, initialSnowball: number): TPayoffDataRow[] => {
  let payoffData: TPayoffDataRow[] = calculatorData.map(cData => {
    return {
      creditor: cData.creditor,
      originalBalance: cData.balance,
      rate: cData.rate / 100,
      interestPaid: 0,
      paymentAmount: cData.payment,
      paymentCount: 0,
      payoffDate: '',
      data: []
    }
  })

  if (strategy === CalculatorStrategyEnum.AVALANCHE) {
    payoffData = payoffData.sort((rowA, rowB) => {
      return rowB.rate - rowA.rate
    })
  }

  if (strategy === CalculatorStrategyEnum.SNOWBALL) {
    payoffData = payoffData.sort((rowA, rowB) => {
      return rowA.originalBalance - rowB.originalBalance
    })
  }

  const now = new Date();
  let snowballValue = 0;
  let nonSnowballPayments = 0;
  let firstPaymentExtra = 0;

  for (const debt of payoffData) {
    const index = payoffData.indexOf(debt);
    const snowball = index === 0 ? initialSnowball : snowballValue;
    const { calculatedData, leftoverPayment, newSnowball } = calculateCompoundInterestPayments(debt, snowball, nonSnowballPayments, firstPaymentExtra);

    const paymentCount = calculatedData.length;

    snowballValue = newSnowball;
    nonSnowballPayments = nonSnowballPayments < paymentCount ? paymentCount : nonSnowballPayments;
    firstPaymentExtra = leftoverPayment;

    debt.data = calculatedData;
    debt.paymentCount = paymentCount;
    debt.interestPaid = _.sumBy(calculatedData, 'interestPaid');
    debt.paymentAmount = _.sumBy(calculatedData, 'paymentAmount');
    debt.payoffDate = calculatePayoffDate(now, paymentCount);
  }

  return payoffData;
}

const calculateCompoundInterestPayments = (row: TPayoffDataRow, snowball: number, nonSnowballPayments: number, firstPaymentExtra: number) => {
  const calculatedData: TPaymentDataRow[] = [];
  const { creditor, rate, originalBalance, paymentAmount } = row;

  let index = 0;
  let isPaidOff = false;
  let usedExtraPayment = false;
  const paidOff = (balanceDue: number): boolean => { return balanceDue <= 0; }

  do {
    const balance = index !== 0 ? calculatedData[index - 1].afterPaymentBalance : originalBalance;
    const interestPaid = (balance * (rate / 100)) / 12;
    let payment = 0;
    if (nonSnowballPayments > index) {
      payment = paymentAmount;
    } else if (!usedExtraPayment) {
      payment = paymentAmount + snowball + firstPaymentExtra;
      usedExtraPayment = true;
    } else {
      payment = paymentAmount + snowball;
    }

    let afterPaymentBalance = balance - (payment - interestPaid);

    if (afterPaymentBalance < 0) {
      payment = payment + afterPaymentBalance;
      afterPaymentBalance = 0;
    }

    const row: TPaymentDataRow = {
      creditor,
      afterPaymentBalance,
      interestPaid,
      rate,
      paymentAmount: payment,
    }
    console.info(`${row.creditor} ${index}: `, row)
    calculatedData.push(row);

    index++
    isPaidOff = paidOff(afterPaymentBalance);
  } while (!isPaidOff);

  const newSnowball = snowball + paymentAmount;
  const leftoverPayment = newSnowball - calculatedData[index - 1].paymentAmount;

  const result = {
    calculatedData,
    leftoverPayment,
    newSnowball
  }
  return result;
}

const calculatePayoffDate = (date: Date, months: number): string => {
  const futureDate = new Date(date);

  let futureMonth = futureDate.getMonth() + months;
  let futureYear = futureDate.getFullYear();

  while (futureMonth >= 12) {
    futureMonth -= 12;
    futureYear++;
  }

  futureDate.setMonth(futureMonth);
  futureDate.setFullYear(futureYear);

  return `${futureDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
}

export const displayMoney = (amount: number): string => {
  const fixedAmount = amount.toFixed(2);
  return `$ ${fixedAmount}`;
}

export const calculateTotals = (payoffData: TPayoffDataRow[]): TTotals => {
  const totalInterest = _.sumBy(payoffData, 'interestPaid');

  const result = {
    totalInterest
  }

  return result;
}