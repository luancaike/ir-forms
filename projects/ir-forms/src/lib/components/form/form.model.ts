import { IrComponents } from '../inputs/components.base';

export interface IrFormConfig {
  key?: string;
  value?: any;
  hidden?: boolean;
  component?: new () => IrComponents;
  instance?: IrComponents;
  colClasslist?: string[];
  children?: IrFormConfig[];
  selectOptions?: IrSelectOptionsConfig;
  fieldOptions?: IrFieldOptions;
  onChange?: Function;
}
export interface IrFieldOptions {
  label?: string;
  typeInput?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  maxLengh?: number;
  minLengh?: number;
  max?: number;
  min?: number;
  rows?: number | string;
}
export interface IrSelectOptionsConfig {
  keyId?: number;
  keyText?: string;
  keyValue?: string;
  data?: object[];
}
