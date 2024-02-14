export type TCalculatorInputRow = {
  creditor: string;
  balance: number;
  rate: number;
  payment: number;
};

export type TPayoffDataRow = {
  creditor: string;
  originalBalance: number;
  interestPaid: number;
  rate: number;
  paymentAmount: number;
  paymentCount: number;
  payoffDate: string;
  data: TPaymentDataRow[];
}

export type TPaymentDataRow = {
  creditor: string;
  afterPaymentBalance: number;
  interestPaid: number;
  rate: number;
  paymentAmount: number;
  payoffDate?: string;
}

export type TTotals = {
  totalInterest: number
}