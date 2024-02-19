import { useEffect, useState } from 'react';
import { TCalculatorInputRow, TPayoffDataRow, TTotals } from '../types/calculatorTypes';
import { calculatePayoffData, calculateTotals, sumField } from './DebtReductionCalculator.svc';
import { CalculatorStrategyEnum } from '../enums/CalculatorStrategyEnum';

const useDebtReductionCalculatorHook = () => {
  const title = 'Debt Reduction Calculator';
  const now = new Date().toLocaleDateString();
  const emptyCalculatorRow: TCalculatorInputRow = {
    creditor: '',
    balance: 0,
    rate: 0,
    payment: 0
  };

  const emptyTotals: TTotals = {
    totalInterest: 0
  };

  const tempData: TCalculatorInputRow[] = [
    emptyCalculatorRow
    // {
    //   creditor: 'WF - Points',
    //   balance: 5612,
    //   rate: 2524,
    //   payment: 250
    // },
    // {
    //   creditor: 'WF - Cash Back',
    //   balance: 14069.67,
    //   rate: 2999,
    //   payment: 550
    // },
    // {
    //   creditor: 'Discover',
    //   balance: 12962.79,
    //   rate: 2524,
    //   payment: 250
    // },
    // {
    //   creditor: 'Amex',
    //   balance: 4333.61,
    //   rate: 2999,
    //   payment: 200
    // },
    // {
    //   creditor: 'Citi',
    //   balance: 8180,
    //   rate: 0,
    //   payment: 82
    // },
    // {
    //   creditor: 'Chase',
    //   balance: 1443.18,
    //   rate: 2749,
    //   payment: 46
    // },
    // {
    //   creditor: 'Synchrony',
    //   balance: 6037.72,
    //   rate: 399,
    //   payment: 250
    // }
  ];

  const [creditorData, setCreditorData] = useState<TCalculatorInputRow[]>([...tempData]);
  const [payoffData, setPayoffData] = useState<TPayoffDataRow[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [paymentBudget, setPaymentBudget] = useState<number>(2500);
  const [paymentStrategy, setPaymentStrategy] = useState<CalculatorStrategyEnum>(CalculatorStrategyEnum.SNOWBALL);
  const [initialSnowball, setInitialSnowball] = useState<number>(0);
  const [totals, setTotals] = useState<TTotals>(emptyTotals);

  const handleChangePaymentBudget = (value: number) => {
    setPaymentBudget(value);
  };

  const handleChangePaymentStrategy = (newStrategy: CalculatorStrategyEnum) => {
    setPaymentStrategy(newStrategy);
  };

  const handleChangeCreditor = (index: number, update: string) => {
    const updateData = [...creditorData];
    updateData[index].creditor = update;
    setCreditorData(updateData);
  };

  const handleChangeBalance = (index: number, update: number) => {
    const updateData = [...creditorData];
    updateData[index].balance = update;
    setCreditorData(updateData);
  };

  const handleChangeRate = (index: number, update: number) => {
    const updateData = [...creditorData];
    updateData[index].rate = update;
    setCreditorData(updateData);
  };

  const handleChangePayment = (index: number, update: number) => {
    const updateData = [...creditorData];
    updateData[index].payment = update;
    setCreditorData(updateData);
  };

  const handleCalculatePayoffData = () => {
    const calculatedPayoffData = calculatePayoffData(creditorData, paymentStrategy, initialSnowball);
    setPayoffData(calculatedPayoffData);
    const calculatedTotals = calculateTotals(calculatedPayoffData);
    setTotals(calculatedTotals);
  };

  const addRow = () => {
    const addEmptyRow = [...creditorData, emptyCalculatorRow];
    setCreditorData(addEmptyRow);
  };

  const delRow = (index: number) => {
    const updateData = [...creditorData];
    updateData.splice(index, 1);
    setCreditorData(updateData);
  };

  useEffect(() => {
    const updateTotalBalance = sumField(creditorData, 'balance');
    setTotalBalance(updateTotalBalance);
  }, [creditorData]);

  useEffect(() => {
    const updateTotalPayment = sumField(creditorData, 'payment');
    setTotalPayment(updateTotalPayment);
  }, [creditorData]);

  useEffect(() => {
    const snowball = paymentBudget - totalPayment;
    setInitialSnowball(snowball);
  }, [paymentBudget, totalPayment]);

  return {
    title,
    now,
    creditorData,
    totalBalance,
    totalPayment,
    paymentBudget,
    payoffData,
    paymentStrategy,
    initialSnowball,
    totals,
    addRow,
    delRow,
    handleChangeCreditor,
    handleChangeBalance,
    handleChangeRate,
    handleChangePayment,
    handleChangePaymentBudget,
    handleChangePaymentStrategy,
    handleCalculatePayoffData
  };
};

export default useDebtReductionCalculatorHook;
