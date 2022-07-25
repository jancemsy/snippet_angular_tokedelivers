import {AfterViewInit, Component, ViewChild, Input , OnChanges,TemplateRef, OnInit,  Output, EventEmitter,ChangeDetectorRef } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { IEmployeeInformation, FieldSelectInterface } from 'src/app/models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';  
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-employee',  
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']  

})
export class EmployeeListComponent implements  AfterViewInit,  OnChanges , OnInit  {  

  @Input() show_dispensary_id : number = 0; 
  @Input() standalone :boolean = true; 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

 

  public subjectEmployee: IEmployeeInformation = null; 
  public targetDeleteId : number = 0;
  public isEditEmployeeModal : boolean = true; 
  public bsModalRef: BsModalRef; 
  public selected_dispensary:number = 0;
  public dispensaryFormField = new FormControl();  
 
  public displayedColumns: string[] = ['id', 'name', 'phone', 'email','roles','dispensaries', 'action'];  
  public dispensaryList: FieldSelectInterface[] = null;  
  public dataSource = null;  //tablegrid 
  

  constructor(private _toastr: ToastrService,
    private _eservice: EmployeeService, 
    private modalService: BsModalService, 
    private ref: ChangeDetectorRef) {

    this.startEmployeeList();  
  }
 

  ngOnInit():void { 
  }     
   
  ngOnChanges(){ 
    //this.buildData();
  } 
 
  public async startEmployeeList(){
    await  this._eservice.initListEmployees();
    this.dataSource  = new MatTableDataSource();  
    this.buildData(); 

    console.log("DISPENSARY ID IS ", this.show_dispensary_id );
    if(this.show_dispensary_id !== 0){

      this.selected_dispensary = this.show_dispensary_id;
      this.changeEmployeeFilter({});
    } 
  }

  public async buildData(){    
    this._eservice.buildEmployeeListData().then(params =>{  
      let tablegridData: IEmployeeInformation[] =  params.employeeListTable;         
      this.dispensaryList = params.dispensaryListSelection;       
      this.dataSource.data = tablegridData;  
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.ref.detectChanges(); 
    });  
  }

 
  public async changeEmployeeFilter(event){ 
    this._eservice.filterEmployeeListData(this.selected_dispensary);
    this.buildData();
  }
  
  public searchEmployee(event){ 
     var key =  event.target.value;
     this._eservice.filterEmployeeListDataBySearchKey(key);
     this.buildData(); 
  }


  public clickViewId(){    
  } 
 

  public clickModalEditEmployee(template: TemplateRef<any>, employeeId : number) {      
    this.subjectEmployee =  this._eservice.getEmployees().filter(a => a.id == employeeId )[0]; 
    this.isEditEmployeeModal = true; 
    this.ref.detectChanges();
    this.openEmployeeModal(template);
  }

  public openEmployeeModal(template: TemplateRef<any>){
    this.modalService.config.ignoreBackdropClick = true; 
    this.bsModalRef = this.modalService.show(template,  { class: 'edit-employee-modal' } );    
  }

  public clickModalAddEmployee(template: TemplateRef<any>){       
    this.subjectEmployee = null; 
    this.isEditEmployeeModal = false; 
    this.ref.detectChanges();
    this.openEmployeeModal(template);  
  }
 
  public clickConfirmDeleteModal(template: TemplateRef<any>, targetDeleteId){   
    this.targetDeleteId = targetDeleteId;
    this.modalService.config.ignoreBackdropClick = true; 
    this.bsModalRef = this.modalService.show(template,  { class: '' } );     
  }
 
  public async deleteEmployee(){ 
    let result :any = await this._eservice.deleteEmployee(this.targetDeleteId);
    if(result.success == true){ 
      this._toastr.success("The employee has been successfully deleted.");    
      this.buildData();
      this.bsModalRef.hide(); 
    }else{
      this._toastr.error("There was an error deleting the employee.");   
    }  
  }

  public employeeEditNotification(state){   
    this.buildData();  
    this.bsModalRef.hide();  
    if(state == 'new'){
      this._toastr.success("The employee has been added!"); 
    }else if(state == 'update') { 
      this._toastr.success("The employee has been updated!"); 
    }
  }
 
  
  ngAfterViewInit() {
 
  }  
} 