import { Student } from './Student';

export interface Demande {
  id?: number;
  name?: string;
  students?: Student[];
}
