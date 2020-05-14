export interface IrFormConfig {
  type: string;
  key: string;
  colClasslist?: string[];
  selectOptions?: IrSelectOptionsConfig;
  label?: string;
  typeInput?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  maxLengh?: number;
  minLengh?: number;
  max?: number;
  min?: number;
  onChange?: Function;
}
export interface IrSelectOptionsConfig {
  keyId?: number;
  keyName?: string;
  data?: object[];
}
