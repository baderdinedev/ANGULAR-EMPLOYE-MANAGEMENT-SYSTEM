import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import { AddEmplyeeComponent } from '../add-emplyee/add-emplyee.component';
import {ListEmployeeComponent} from "../list-employee/list-employee.component"
@Component({
  selector: 'app-employee',
  imports: [MatCardModule,MatButtonModule,MatDialogModule,ListEmployeeComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  constructor(private dialog:MatDialog){}
  addemploye() {
      this.dialog.open(AddEmplyeeComponent, {
        width:'50%',
        exitAnimationDuration:"1000ms",
        enterAnimationDuration:"1000ms"
      })
  }
}
