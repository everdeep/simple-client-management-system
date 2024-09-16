import { type } from '@src/types';

interface IAction {
  type: string;
  payload?: any;
}

export const formUpdate = (fieldName: string, fieldValue: any) => {
  return {
    type: type.FORM_UPDATE,
    payload: {
      name: fieldName,
      value: fieldValue,
    },
  };
};

export const formClear = () => {
  return {
    type: type.FORM_CLEAR,
  };
};

export const alertSet = (message: string, className: string) => {
  return {
    type: type.ALERT,
    payload: {
      message: message,
      className: className,
    },
  };
};

export const alertClear = () => {
  return {
    type: type.ALERT_CLEAR,
  };
};
