import { Role } from '@/shared/libs/types';

export interface AuthByPhoneProps {
  phone_number: string;
  password: string;
  role: Role;
}
