import { useEffect, useState } from 'react';
import { TCalculatorRow, TPayoffRow } from '../types/calculatorTypes';
import { calculatePayoffData, sumField } from './DebtReductionCalculator.svc';
import { CalculatorStrategyEnum } from '../enums/CalculatorStrategyEnum';

const tempData: TCalculatorRow[] = [
  {
    creditor: 'A',
    balance: 1000,
    rate: 55,
    payment: 50
  },
  {
    creditor: 'B',
    balance: 2000,
    rate: 25,
    payment: 100
  },
  {
    creditor: 'C',
    balance: 3000,
    rate: 45,
    payment: 150
  }
];

const useDebtReductionCalculatorHook = () => {
  const title = 'Debt Reduction Calculator';
  const now = new Date().toLocaleDateString();
  const emptyCalculatorRow: TCalculatorRow = {
    creditor: 'D',
    balance: 100,
    rate: 100,
    payment: 1
  };

  const [creditorData, setCreditorData] = useState<TCalculatorRow[]>([...tempData, emptyCalculatorRow]);
  const [payoffData, setPayoffData] = useState<TPayoffRow[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [paymentBudget, setPaymentBudget] = useState<number>(500);
  const [paymentStrategy, setPaymentStrategy] = useState<CalculatorStrategyEnum>(CalculatorStrategyEnum.SNOWBALL);
  const [initialSnowball, setInitialSnowball] = useState<number>(0);

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
    const calculatedPayoffData = calculatePayoffData(creditorData, paymentStrategy, paymentBudget, initialSnowball);
    setPayoffData(calculatedPayoffData);
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
