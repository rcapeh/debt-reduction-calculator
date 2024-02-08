import { FunctionComponent } from 'react';
import useDebtReductionCalculatorHook from './DebtReductionCalculator.vm';
import {
  Container,
  TableContainer,
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
  FormControl,
  Button,
  SelectChangeEvent,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box
} from '@mui/material';
import { AddCircle as AddIcon, RemoveCircle as DelIcon, Summarize as PaymentScheduleIcon } from '@mui/icons-material';
import { calculatorStrategyOptions } from '../enums/CalculatorStrategyEnum';
import { displayMoney } from './DebtReductionCalculator.svc';
import AccountingStyleMoney from './AccountingStyleMoney';

const DebtReductionCalculator: FunctionComponent = () => {
  const vm = useDebtReductionCalculatorHook();

  return (
    <>
      <Container sx={{ my: 4 }}>
        <Card>
          <CardHeader title={vm.title} subheader={vm.now} />
          <CardActions>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Strategy</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Strategy"
                value={vm.paymentStrategy}
                onChange={(e: SelectChangeEvent) => {
                  const eventEnum = calculatorStrategyOptions.find((option) => option.id === e.target.value)?.value;
                  if (eventEnum) {
                    vm.handleChangePaymentStrategy(eventEnum);
                  }
                }}
              >
                {calculatorStrategyOptions.map((option) => {
                  return (
                    <MenuItem key={option.id} value={option.value}>
                      {option.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              label="Available Payment Amount"
              type="number"
              inputProps={{ min: 0, style: { textAlign: 'right' } }}
              InputLabelProps={{
                shrink: true
              }}
              value={vm.paymentBudget}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                vm.handleChangePaymentBudget(Number(e.target.value));
              }}
            />
            <TextField
              inputProps={{ min: 0, style: { textAlign: 'right' } }}
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              disabled
              label="Initial Snowball"
              value={vm.initialSnowball}
            />
            <Button variant="contained" onClick={vm.handleCalculatePayoffData} size="large">
              Calculate
            </Button>
          </CardActions>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Creditor</TableCell>
                    <TableCell align="center">Balance</TableCell>
                    <TableCell align="center">Payment</TableCell>
                    <TableCell align="center">Rate</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vm.creditorData.map((data, index) => (
                    <TableRow key={`creditor-data-${index}`}>
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
                          fullWidth
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
                    <TableCell></TableCell>
                    <TableCell>
                      <Box display={'flex'} justifyContent={'space-between'}>
                        <span>Total Balance</span> <span>{displayMoney(vm.totalBalance)}</span>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display={'flex'} justifyContent={'space-between'}>
                        <span>Total Payment</span> <span>{displayMoney(vm.totalPayment)}</span>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display={'flex'} justifyContent={'space-between'}>
                        <span>Initial Snowball</span> <span>{displayMoney(vm.initialSnowball)}</span>
                      </Box>
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
          </CardContent>
          <CardHeader title="summary" />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Creditor</TableCell>
                    <TableCell align="center">Total Paid</TableCell>
                    <TableCell align="center">Original Balance</TableCell>
                    <TableCell align="center">Interest Paid</TableCell>
                    <TableCell align="center">Payments</TableCell>
                    <TableCell align="center">Payoff Date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vm.payoffData.length > 0 ? (
                    <>
                      {vm.payoffData.map((data, index) => {
                        return (
                          <TableRow key={`payoff-data-${index}`}>
                            <TableCell>{data.creditor}</TableCell>
                            <TableCell>
                              <AccountingStyleMoney amount={data.paymentAmount} />
                            </TableCell>
                            <TableCell>
                              <AccountingStyleMoney amount={data.originalBalance} />
                            </TableCell>
                            <TableCell>
                              <AccountingStyleMoney amount={data.interestPaid} />
                            </TableCell>
                            <TableCell align="center">{data.paymentCount}</TableCell>
                            <TableCell align="right">{data.payoffDate}</TableCell>
                            <TableCell align="right">
                              <Button>
                                <PaymentScheduleIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No Data.
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default DebtReductionCalculator;
