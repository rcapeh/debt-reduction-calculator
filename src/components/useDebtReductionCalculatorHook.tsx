import { useEffect, useState } from 'react';
import { TCalculatorRow } from '../types/calculatorTypes';

const useDebtReductionCalculatorHook = () => {
  const title = 'Debt Reduction Calculator';
  const now = new Date().toLocaleDateString();
  const emptyRow: TCalculatorRow = {
    creditor: '',
    balance: null,
    rate: null,
    payment: null
  };

  const [data, setData] = useState<TCalculatorRow[]>([emptyRow]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const handleChangeCreditor = (index: number, update: string) => {
    const updateData = [...data];
    updateData[index].creditor = update;
    setData(updateData);
  };

  const handleChangeBalance = (index: number, update: number) => {
    const updateData = [...data];
    updateData[index].balance = update;
    setData(updateData);
  };

  const handleChangeRate = (index: number, update: number) => {
    const updateData = [...data];
    updateData[index].rate = update;
    setData(updateData);
  };

  const handleChangePayment = (index: number, update: number) => {
    const updateData = [...data];
    updateData[index].payment = update;
    setData(updateData);
  };

  const sumTotalBalance = (data: TCalculatorRow[]): number => {
    let sum = 0;
    for (const item of data) {
      sum += item.balance ?? 0;
    }

    return sum;
  };

  const sumTotalPayment = (data: TCalculatorRow[]): number => {
    let sum = 0;
    for (const item of data) {
      sum += item.payment ?? 0;
    }

    return sum;
  };

  const addRow = () => {
    const addEmptyRow = [...data, emptyRow];
    setData(addEmptyRow);
  };

  const delRow = (index: number) => {
    const updateData = [...data];
    updateData.splice(index, 1);
    setData(updateData);
  };

  useEffect(() => {
    const updateTotalBalance = sumTotalBalance(data);
    setTotalBalance(updateTotalBalance);
    const updateTotalPayment = sumTotalPayment(data);
    setTotalPayment(updateTotalPayment);
  }, [data]);

  return {
    title,
    now,
    data,
    totalBalance,
    totalPayment,
    addRow,
    delRow,
    handleChangeCreditor,
    handleChangeBalance,
    handleChangeRate,
    handleChangePayment
  };
};

export default useDebtReductionCalculatorHook;
