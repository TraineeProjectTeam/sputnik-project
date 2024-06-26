import { Role } from '@/shared/libs/types';

export interface RegistrationProps {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  role: Role;
}
