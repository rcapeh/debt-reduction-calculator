import { FunctionComponent } from 'react';
import useDebtReductionCalculatorHook from './useDebtReductionCalculatorHook';
import {
  Container,
  Box,
  Typography,
  TableContainer,
  Paper,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableBody,
  TextField,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { AddCircle as AddIcon, RemoveCircle as DelIcon } from '@mui/icons-material';
import { calculatorStrategyOptions } from '../enums/CalculatorStrategyEnum';

const DebtReductionCalculator: FunctionComponent = () => {
  const vm = useDebtReductionCalculatorHook();

  return (
    <>
      <Container sx={{ my: 4 }}>
        <Box>
          <Typography variant="h4">{vm.title}</Typography>
          <Typography variant="h5">{vm.now}</Typography>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Creditor</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vm.data.map((data, index) => (
                  <TableRow>
                    <TableCell>
                      <TextField
                        id={`${index}-${data.creditor}-creditor-${Math.random()}`}
                        InputLabelProps={{
                          shrink: true
                        }}
                        value={data.creditor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          vm.handleChangeCreditor(index, e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`${index}-${data.creditor}-balance-${Math.random()}`}
                        type="number"
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        InputLabelProps={{
                          shrink: true
                        }}
                        value={data.balance}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          vm.handleChangeBalance(index, Number(e.target.value));
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`${index}-${data.creditor}-rate-${Math.random()}`}
                        type="number"
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        InputLabelProps={{
                          shrink: true
                        }}
                        value={data.rate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          vm.handleChangeRate(index, Number(e.target.value));
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`${index}-${data.creditor}-payment-${Math.random()}`}
                        type="number"
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        InputLabelProps={{
                          shrink: true
                        }}
                        value={data.payment}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          vm.handleChangePayment(index, Number(e.target.value));
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          vm.delRow(index);
                        }}
                        color="error"
                      >
                        <DelIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell align="center">Total Balance</TableCell>
                  <TableCell align="right" sx={{ pr: 8 }}>
                    {vm.totalBalance}
                  </TableCell>
                  <TableCell align="center">Total Payment</TableCell>
                  <TableCell align="right" sx={{ pr: 8 }}>
                    {vm.totalPayment}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={vm.addRow} color="success">
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <p> here is the budgeted monthly payment</p>
          <p> and the calculated initial extra payment amount</p>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Strategy</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Strategy">
              {calculatorStrategyOptions.map((option) => {
                return <MenuItem value={option.value}>{option.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <p>here is a table for the general results of the calculator</p>
          <p>this could be a separate component (since it only takes data) to keep this cleaner</p>
          <p>creditors | original balance | total interest paid | years to pay off | month paid off</p>
          <p>this should also have a modal with the payment schedule for each creditor</p>
        </Box>
      </Container>
    </>
  );
};

export default DebtReductionCalculator;
