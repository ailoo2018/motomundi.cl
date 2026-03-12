import {Departments} from "@/models";

export const useDepartment = () => useState('department', () => Departments.Road)
