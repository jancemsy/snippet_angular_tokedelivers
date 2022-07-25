export interface IStepperItem {
  label: number | string;
  value: number | string;
  stepTitle?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  isSuccess?: boolean;
}
