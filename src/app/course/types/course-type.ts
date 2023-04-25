import { ModuleType } from "./module-type";

export type CourseType = {
  id?: number;
  title: string;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  objective: string;
  creator?: any;
  modules?: Array<ModuleType>;
};
