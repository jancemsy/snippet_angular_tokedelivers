import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditEmployeeComponent } from 'src/app/pages/dispensary/employee/components/edit-employee/edit-employee.component';
import { EmployeesService } from 'src/app/services/employees/employees.service';

import { UsersService } from 'src/app/services/users/users.service';
import { CustomDataTableComponent } from 'src/app/shared/components/data-table/data-table.component';

@Component({
  selector: 'app-dispensary-employees',
  templateUrl: './dispensary-employees.component.html',
  styleUrls: ['./dispensary-employees.component.scss'],
})
export class DispensaryEmployeesComponent implements OnInit {
  existingEmployees: any[] = [];
  roles: any[] = [];
  employees: any[] = [];

  employeeToAdd: any = {
    employee_id: null,
    role_id: null,
  };

  headers = [
    { field: 'name' },
    { field: 'role_label', label: 'Role' },
    { field: 'email' },
    { field: 'phone' },
    { field: 'actionButtons', label: '' }
  ];

  dtActionButtons = [
    {
      class: 'custom-class-here',
      iconClass: 'fa-trash-o',
      click: (menuItem: any, item: any) => {
        this.dataTable.actionEvent.emit({ menuItem, item });
      },
    },
  ];

  @Output() next = new EventEmitter<any>();
  @Output() back = new EventEmitter<any>();
  @ViewChild(CustomDataTableComponent) dataTable: CustomDataTableComponent;

  constructor(
    private _modalService: NgbModal,
    private _usersService: UsersService,
    private _employeesService: EmployeesService,
  ) {
    this.getRoles();
  }

  ngOnInit(): void {
    this.getEmployeesList();
  }

  employeeTableActions(event) {
    const { menuItem, item } = event;

    switch(menuItem) {
      case 0: // delete
        this.employees = this.employees.filter(employee => employee.id !== item.id);
        break;
    }
  }

  getEmployeesList() {
    this._employeesService.getEmployeesList()
      .subscribe(
        (successResponse: any) => {
          const { data } = successResponse;
          this.existingEmployees = data[0].employees;
          if (this.existingEmployees && this.existingEmployees.length) {
            this.existingEmployees.map(employee => {
              const { first_name, last_name } = employee;
              employee.name = `${first_name} ${last_name}`;
            });
          }
        },
        (errorResponse: any) => {
          console.log(errorResponse);
        }
      );
  }

  getRoles() {
    this._usersService.getUserRoles()
      .subscribe(
        (successResponse: any) => {
          const { data } = successResponse;

          if (data) {
            this.roles = data.roles;
          }
        },
        (errorResult: any) => {
          console.log(errorResult);
        }
      )
  }

  selectEmployee(id) {
    return this.existingEmployees.find(employee => `${employee.id}` === id);
  }

  getRole(id) {
    const role = this.roles.find(role => `${role.id}` === id);
    return role ? role.name : '';
  }

  onAddEmployee() {
    const { employee_id, role_id } = this.employeeToAdd;
    if (employee_id && role_id) {
      const selectedEmployee = this.selectEmployee(employee_id);
      const { id } = selectedEmployee;

      if (selectedEmployee) {
        this.employees.push({
          ...selectedEmployee,
          employee_id,
          role_id,
          role_label: this.getRole(role_id),
          actionButtons: this.dtActionButtons
        });

        this.employeeToAdd = { employee_id: null, role_id: null };
      }
    }
  }

  onBack() {
    const { employees } = this;
    this.back.emit({ screen: 2, values: { employees } });
  }

  onCreateNewEmployee() {
    const modalRef = this._modalService.open(EditEmployeeComponent, { size: 'lg' });
  }

  onNext() {
    const { employees } = this;
    this.next.emit({ screen: 2, values: { employees } });
  }
}
