export type TCalculatorRow = {
  creditor: string;
  balance: number;
  rate: number;
  payment: number;
};

export type TPayoffRow = {
  creditor: string;
  originalBalance: number;
  interestPaid: number;
  rate: number;
  paymentAmount: number;
  paymentCount: number;
  payoffDate: string;
  data: TCalculatingRow[];
}

export type TCalculatingRow = {
  creditor: string;
  afterPaymentBalance: number;
  interestPaid: number;
  rate: number;
  paymentAmount: number;
  payoffDate?: string;
}