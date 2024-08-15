import { ILoginEmailDetails, ILoginPhoneDetails } from './auth.types';

export const initialValuesEmailForm: ILoginEmailDetails = {
  email: '',
  password: '',
  role: 'Customer',
};

export const initialValuesPhoneForm: ILoginPhoneDetails = {
  role: 'Customer',
  phone_number: '',
  password: '',
};
