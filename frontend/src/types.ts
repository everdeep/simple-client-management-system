export const type = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  PAGE_HOME: 'PAGE_HOME',
  FORM_UPDATE: 'FORM_UPDATE',
  FORM_CLEAR: 'FORM_CLEAR',
  ALERT: 'ALERT',
  ALERT_CLEAR: 'ALERT_CLEAR',
};

export type JsonApiResponse<T> = {
  success: boolean;
  message: string;
  responseObject: T;
  statusCode: number;
};

export type Client = {
  id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  dob: string;
  createdAt?: string;
  updatedAt?: string;
  fundingSource: string;
  languages: ClientLanguage[];
};

export type ClientLanguage = {
  id: string;
  name?: string;
  isPrimary: string;
};

export type Language = {
  id: string;
  name: string;
};
