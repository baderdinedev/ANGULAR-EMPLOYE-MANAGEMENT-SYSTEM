import { Routes } from '@angular/router';
import { EmployeeComponent } from './component/employee/employee.component';
import { UpdateEmployeeComponent } from './component/update-employee/update-employee.component';
import { ListEmployeeComponent } from './component/list-employee/list-employee.component';

export const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'employee/:id',
    component: UpdateEmployeeComponent
  },
  {
    path: 'employee/:id',
    component: ListEmployeeComponent
  }
];
