import {ITeacher} from './Teacher';

export interface ITime {
  title: string;
  id: number;
  availableTeachers: Array<ITeacher>;
  year: string;
  weeks: string;
  1?: object;
  2?: object;
  3?: object;
  4?: object;
  5?: object;
  6?: object;
  7?: object;
}
