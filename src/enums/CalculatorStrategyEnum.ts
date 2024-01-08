import { TSelectOption } from "../types/formInputTypes";

export enum CalculatorStrategyEnum {
  AVALANCHE = "AVALANCHE",
  SNOWBALL = "SNOWBALL"
}

export const calculatorStrategyOptions: TSelectOption[] = [
  { id: CalculatorStrategyEnum.AVALANCHE, value: CalculatorStrategyEnum.AVALANCHE, label: 'Avalanche (Highest interest first)' },
  { id: CalculatorStrategyEnum.SNOWBALL, value: CalculatorStrategyEnum.SNOWBALL, label: 'Snowball (Lowest balance first)' }
];
