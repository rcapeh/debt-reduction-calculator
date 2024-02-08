import { Box } from '@mui/material';
import { FunctionComponent } from 'react';

export type TAccountingStyleMoneyProps = {
  amount: number;
};

const AccountingStyleMoney: FunctionComponent<TAccountingStyleMoneyProps> = (props) => {
  return (
    <Box display={'flex'} justifyContent={'space-between'} sx={{}}>
      <span style={{ paddingLeft: 18 }}>$</span>
      <span style={{ paddingRight: 18 }}>{props.amount.toFixed(2)}</span>
    </Box>
  );
};

export default AccountingStyleMoney;
