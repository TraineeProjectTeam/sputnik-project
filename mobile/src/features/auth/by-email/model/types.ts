import { Role } from '@/shared/libs/types';

export interface AuthByEmailProps {
  email: string;
  password: string;
  role: Role;
}
