import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../models/Employee';
import { EmployeeService } from '../../service/employee.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-emplyee',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatIconModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-emplyee.component.html',
  styleUrls: ['./add-emplyee.component.css']
})

export class AddEmplyeeComponent {
  title = "Add Employee";

  constructor(
    private employeService: EmployeeService,
    private ref: MatDialogRef<AddEmplyeeComponent>
  ) {}

  empForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    doj: new FormControl(new Date(), Validators.required),
    role: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required)
  });

  saveEmploye() {
    if (this.empForm.valid) {
      let _data: Employee = {
        id: this.empForm.value.id as number,
        name: this.empForm.value.name as string,
        doj: new Date(this.empForm.value.doj as Date),
        role: this.empForm.value.role as string,
        salary: this.empForm.value.salary as number
      };

      this.employeService.Create(_data).subscribe({
        next: (item) => {
          alert("saved");
          this.closepopup();
        },
        error: (err) => {
          console.error('Error saving employee:', err);
          alert("Error saving employee");
        }
      });
    }
  }

  closepopup() {
    this.ref.close();
  }
}
