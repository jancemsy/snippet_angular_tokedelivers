import { Component, Input, OnInit, EventEmitter, Output,ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router'; 
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service'; 
import { IEmployeeInformation, FieldSelectInterface } from 'src/app/models';
import { EmployeeService } from '../../services/employee.service';
import { getBase64Format } from 'src/app/@core/functions/file-upload-utils.function';
import { ToastrService } from 'ngx-toastr';
import { allowedMimeTypes, licenseStatus } from 'src/app/@core/constants';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  formState: string = "active";

  @Input() subjectEmployee :IEmployeeInformation = null;  
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
 
  private isEdit : boolean = false; 

 
  //public variables used in view
  public errors : any[] =  null; 
  public selected_dispensary = null; 
  public selected_role = null;  
  public EmployeeRoleList : FieldSelectInterface[] = [];  
  public dispensaryList: FieldSelectInterface[] = []; 
  public employeeRolesTablegridData: any[] =  [];  
  public form:IEmployeeInformation = <IEmployeeInformation>{};
  public can_add_role: boolean = false; 
  public can_add_id : boolean = false; 
  public file_upload_caption : string = "Upload Driver's License";
  public allowedMimeTypes = allowedMimeTypes;
  public uploader: FileUploader = new FileUploader({
    allowedMimeType: allowedMimeTypes,
    maxFileSize: 150 * 1024 * 1024
  });


  constructor(
    private _toastr: ToastrService,
    private _eservice: EmployeeService,
    private _router: Router,
    private _localStorage: LocalStorageService, 
    private ref: ChangeDetectorRef
  ) {        
   }
   
  ngOnInit(): void {
    this.buildForm();    
  }


   public async clickDeleteRole(id){
    this.employeeRolesTablegridData.splice(this.employeeRolesTablegridData.findIndex( a => a.id == id ) ,1);  //delete at frontend   
   } 

   public validate_role(e){ 
    this.can_add_role  = (  this._eservice.isEmpty(this.selected_dispensary) ||  this._eservice.isEmpty(this.selected_role)  ) ? false : true;   
   }

   public validate_id(e){  
    this.can_add_id  = (  this._eservice.isEmpty(this.form.identification_file) ||  this._eservice.isEmpty(this.form.identification_state_issue)  ||  this._eservice.isEmpty(this.form.identification_number) ) ? false : true;       

    console.log("validate_id", this.can_add_id);
   }
   


   public clickAddRole(){ 
    if(this.can_add_role){  
      let dispensary = this._eservice.getDispensaryCaptionByID(this.selected_dispensary);
      let role = this._eservice.getRoleCaptionByID(this.selected_role ); 

      this.employeeRolesTablegridData.push({  "dispensary_id":  this.selected_dispensary,  "dispensary": dispensary, "role": role, "role_id" : this.selected_role  });
      this.selected_dispensary = null; 
      this.selected_role = null;  
      this.can_add_role = false;
    }
   }


   public async buildForm(){  
     console.log("buildForm edit employee ", this.subjectEmployee);

    console.log("roles is ", this._eservice.getRoles());

     if(this.subjectEmployee !== null && this.subjectEmployee.id != -1){ //edit employee   
      this.isEdit = true;
      this.form = this.subjectEmployee;  
      this.employeeRolesTablegridData = [];   
 
     if( !this._eservice.isEmpty(this.subjectEmployee.roles) ){
        var roles = this.subjectEmployee.roles.split(',');
        var dispensaries = this.subjectEmployee.dispensaries.split(',');

        console.log("roles, dispensaries", roles, dispensaries);

        for(var i = 0; i < roles.length; i++){        
          var _dispensary_id = dispensaries[i];
          var _role_id = roles[i];  
          var _role = this._eservice.getRoleCaptionByID( _role_id);
          var _dispensary = this._eservice.getDispensaryCaptionByID(_dispensary_id); 

          this.employeeRolesTablegridData.push({   "dispensary_id":  _dispensary_id ,  "dispensary": _dispensary, "role": _role, "role_id" : _role_id }); 
        } 
      }
    }


     this._eservice.fetchRoleSelections().then(result =>{ 
        this.EmployeeRoleList = result.roleListSelection; 
        this.dispensaryList   = result.dispensaryListSelection; 
     });  

     this.ref.detectChanges();
   }
  

  public clickCancel(){ 
     this.notifyParent.emit('cancel');
  }


  public async clickSave(){      
    console.log("save employee", this.form);
 
    //add dispensary/role ids into one field 
    var _arr = []; 
    for(var i = 0; i < this.employeeRolesTablegridData.length; i++){           
      var _id =  this.employeeRolesTablegridData[i].role_id; 
        _arr.push(_id); 
    }    
    this.form.roles = _arr.join(","); 

    var _arr = []; 
    for(var i = 0; i < this.employeeRolesTablegridData.length; i++){           
      var _id =  this.employeeRolesTablegridData[i].dispensary_id; 
      _arr.push(_id);  
    }
    this.form.dispensaries = _arr.join(",");
 
    this.errors = null; 
    let result = null; 


    if(this.isEdit){       
      result = await this._eservice.updateEmployee(this.form);
    }else{         
      result = await this._eservice.addEmployee(this.form); 
    } 

    if(result.success === true){
        this.notifyParent.emit(this.isEdit ? 'update' : 'new');
    }else{
        this._toastr.error("Please correct the errors.");
        window.scroll(0,0);
        console.log("errors is ", result.errors);
        this.errors = result.errors;
        this.ref.detectChanges();
    } 

    
  }




  public onFileUpload(fileList: FileList ) {
    

    console.log('event: ', fileList[0]);

    const file = fileList[0];
    if (file) { 
       //this.f[field].setValue(file);
 
      getBase64Format(file)
        .then(result => {
          this._toastr.info('The file was attached.');           
          const { name, type } = file; 

          

          this.file_upload_caption = `attached file - ${name}`;
          this.form.identification_file = {
              fileName: name,
              fileType: type,
              file: result
            }; 

            this.validate_id({});
 
            
        }).catch(() => {          
          this._toastr.error('Failed to process selected file.')           
        });  
    } else {
       this.form.identification_file = null;  
    }

     
    
  }


 
}