import { IrComponents } from '../inputs/components.base';

export interface IrFormConfig {
  key?: string;
  value?: any;
  hidden?: boolean;
  component?: new () => IrComponents;
  instance?: IrComponents;
  colClasslist?: string[];
  gridOptions?;
  height?: number | string;
  width?: number | string;
  title?: string;
  fieldData?;
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
  keyId?: string;
  keyText?: string;
  keyValue?: string;
  keyDesc?: string;
  keyPid?: string;
  btnText?: string;
  btnIcon?: string;
  groupIdText?: boolean;
  aliases?: string;
  data?: object[];
}
