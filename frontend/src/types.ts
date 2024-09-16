export const type = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  PAGE_HOME: 'PAGE_HOME',
  FORM_UPDATE: 'FORM_UPDATE',
  FORM_CLEAR: 'FORM_CLEAR',
  ALERT: 'ALERT',
  ALERT_CLEAR: 'ALERT_CLEAR',
};

export type Client = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};
