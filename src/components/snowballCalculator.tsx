import { FunctionComponent } from 'react';
import useSnowballCalculatorHook from './useSnowballCalculatorHook';
import { Container, Box } from '@mui/material';

const SnowballCalculator: FunctionComponent = () => {
  const vm = useSnowballCalculatorHook();

  return (
    <>
      <p>test</p>
      <Container>
        <Box>{vm.title}</Box>
      </Container>
    </>
  );
};

export default SnowballCalculator;
