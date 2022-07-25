import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { IEmployeeInformation, FieldSelectInterface, IEmployeeDispensaries,IEmployeeRoles ,IEmployeeBuildData} from 'src/app/models';
import { EmployeeApiService } from 'src/app/pages/dispensary/employee/services/employee-api.service';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService { 
  private employeeListTable :  IEmployeeInformation[] = null; 
  private employees: IEmployeeInformation[] = null; 
  private roles: IEmployeeRoles[] = null; 
  private dispensaries: IEmployeeDispensaries[] = null; 
  private selectedFilterDispensary : number = 0; 
  private employeeSearchKey : string = ""; 
  private employeeBuildData:IEmployeeBuildData  = null;   

  constructor(
    private _localStorage: LocalStorageService,
    private _empapi : EmployeeApiService,
  ) { }


  public getEmployees() : IEmployeeInformation[]{
    return this.employees;
  }

  public getDispensaryCaptionByID(id) : string{  
     let search : any = this.dispensaries.filter(a => a.id == parseInt(id) )[0]
     if(search){
       return search.name;
     }else{
       return "";
     } 
  }
  
  public getRoleCaptionByID(id) : string{  
    let search : any = this.roles.filter(a => a.id == parseInt(id) )[0]; 

    if(search){  
      return search.name;
    }else{
      return "";
    } 
  }

  public async fetchRoleSelections() : Promise <any>{
    return new Promise( resolve => {
        let dispensaryListSelection : FieldSelectInterface[] = [];
        if (this.dispensaries && this.dispensaries.length) {
          let dlcount = this.dispensaries.length;
          for(var i = 0; i < dlcount ; i ++){
            dispensaryListSelection.push({"value" : this.dispensaries[i].id, "caption" :  this.dispensaries[i].name });
          }
        }

        let roleListSelection : FieldSelectInterface[] = [];
        if (this.dispensaries && this.dispensaries.length) {
          let rlcount = this.roles.length;
          for(var i = 0; i < rlcount ; i ++){
            roleListSelection.push({"value" : this.roles[i].id, "caption" :  this.roles[i].name });
          }
        }

        resolve({dispensaryListSelection, roleListSelection});
      });
  }


  public async initListEmployees(){
    var result = await this.fetchEmployees();    
    this.employees = result[0];
    this.dispensaries = result[1];
    this.roles = result[2];
 
        
    this.employeeListTable = this.employees; 
    this.employeeBuildData =  await this.BuildEmployeeDataList();
   }



 

  public async filterEmployeeListDataBySearchKey( key : any ){
    this.employeeSearchKey = key;

    this.employeeBuildData.employeeListTable  = (this.employeeSearchKey === "") ?  this.employeeListTable :
         this.employeeListTable.filter(a => a.name.toLowerCase().search(this.employeeSearchKey) > -1); // ||  a.dispensaries_caption.toLowerCase().search(this.employeeSearchKey) > -1 ||  a.roles_caption.toLowerCase().search(this.employeeSearchKey) > -1

      //console.log("employee current list ", this.employeeListTable, this.employeeBuildData.employeeListTable);
  }

  public async filterEmployeeListData( filter : any ){ //filter by dispensary
    this.selectedFilterDispensary = filter;
    this.employeeBuildData.employeeListTable  = (this.selectedFilterDispensary == 0) ?  this.employeeListTable :
    this.employeeListTable.filter(a => a.dispensaries.split(",").includes(this.selectedFilterDispensary + ""));
  }

  public isEmpty(val : any){
    return !val ||val === null || val === "" ? true : false; 
  }




  public async BuildEmployeeDataList() : Promise <IEmployeeBuildData>{
    return new Promise( (resolve) => {
          let dispensaries_list = Array.from(this.dispensaries); 

          //build datatablegrid for employees
          let elcount = this.employeeListTable.length; 

          for(var i = 0; i < elcount ; i ++){  
            //roles
            var rids = this.employeeListTable[i].roles.split(",");          
            var dids = this.employeeListTable[i].dispensaries.split(",");  
 
            this.employeeListTable[i].roles_caption = [];
            this.employeeListTable[i].dispensaries_caption = [];  

            for(var j = 0; j < rids.length; j ++ ){     
              if(!this.isEmpty(dids[j])){  
                var _d = this.getDispensaryCaptionByID( parseInt(dids[j]) );
                var _r  = this.getRoleCaptionByID( parseInt(rids[j]) ) 

                this.employeeListTable[i].dispensaries_caption.push(_d); 
                this.employeeListTable[i].roles_caption.push( _r) ;
              }
            } 

            if( this.employeeListTable[i].dispensaries_caption.length === 0  && !this.isEmpty(this.employeeListTable[i].dispensaries)){
              var _d = this.getDispensaryCaptionByID(  parseInt(this.employeeListTable[i].dispensaries)  );
              var _r  = this.getRoleCaptionByID( parseInt(this.employeeListTable[i].roles ) ) ;

              this.employeeListTable[i].dispensaries_caption.push(_d); 
              this.employeeListTable[i].roles_caption.push( _r) ; 
            } 
          } 

          //console.log("employeeListTable", this.employeeListTable);
 

          let dispensaryListSelection : FieldSelectInterface[] =  [ {value: 0, caption: 'All Dispensaries'}];
          let dlcount = dispensaries_list.length;
          for(var i = 0; i < dlcount ; i ++){ 
            dispensaryListSelection.push({"value" : dispensaries_list[i].id, "caption" :  dispensaries_list[i].name });
          }

          var  employeeListTable = this.employeeListTable;
          resolve({employeeListTable, dispensaryListSelection});
     });
  }
    
 public async buildEmployeeListData() : Promise <any>{      
    if(this.employeeBuildData === null){
       this.employeeBuildData =  await this.BuildEmployeeDataList();
    }  
    return Promise.resolve( this.employeeBuildData );  
 }

 public async refreshEmployeeListData() : Promise <any>{
    this.employeeListTable = this.employees;   
    this.employeeBuildData =  await this.BuildEmployeeDataList();
 }

 
///v1/employee/update
public updateEmployee(f:IEmployeeInformation): Promise <any>{       
    return new Promise(resolve => {
      this._empapi.update(f).then(result =>{
        if(result.success){ //success   
           
          f.name = f.first_name + " " + f.last_name;   
          var index = this.employees.findIndex(a => a.id == f.id);
          this.employees[index] = f;  
          console.log("current employees now is ", this.employees); 
          this.refreshEmployeeListData();

  

          resolve({success: true} );  
        }else{ 
          resolve({success: false, errors: result.errors });  
        } 
      }); 
    });  
}

///v1/employee/new
public addEmployee(f:IEmployeeInformation) : Promise <any>{        
  return  new Promise(resolve =>{  
        this._empapi.add(f).then(result =>{
          if(result.success){ //success   
            f.name = f.first_name + " " + f.last_name;   
            f.id = result.data.employee.id;
            f.can_be_deleted  = true; 
            this.employees.push(f);  
            this.refreshEmployeeListData();     
            resolve({success: true} );  
          }else{ 
            resolve({success: false, errors: result.errors });  
          } 
        });  
  });
}

 

public async deleteEmployee(id){    
   return  new Promise(resolve =>{  
    this._empapi.delete(id).then(result =>{
      if(result.success){ //success   
        //this.employeeBuildData =  await this.BuildEmployeeDataList();          

        this.employees.splice(this.employees.findIndex( a => a.id == id ) ,1);  //delete at frontend  
        this.refreshEmployeeListData(); 
        resolve({success: true} );  
      }else{ 
        resolve({success: false, errors: result.errors });  
      } 
    });  
});
}

 

 public getRoles(){
   return this.roles;
 }
  
    
 
  private convertDispensariesToIdString(json) : any{
    let _dispensaries_ids = [];
    let _roles_ids = [];  
    let dispensaries_ids = "";
    let roles_ids = ""; 

    if(json != null){  
      json = JSON.parse(json);
      for(var i = 0; i < json.length; i++){            
          _dispensaries_ids.push(json[i].dispensary_id);
          _roles_ids.push(json[i].role_id); 
      }

      dispensaries_ids  = _dispensaries_ids.join(",");
      roles_ids  = _roles_ids.join(","); 
   } 
     
    return {dispensaries_ids , roles_ids}; 
  }

  

 

  public async fetchEmployees() : Promise< [IEmployeeInformation[], IEmployeeDispensaries[],any[]] >{  
    let employees : IEmployeeInformation[] = [];
    let dispensaries : IEmployeeDispensaries[] = []; //names 
    let roles:any[] = []; 
    

  
    var result = await this._empapi.get();

    if(result.success == true){ 
      var n = result.data[0];

            for(var i = 0; i < n.roles.length; i++){
              roles.push({id:  n.roles[i].id, name:  n.roles[i].name });
            } 

            for(var i = 0; i <  n.dispensaries.length; i++){
              dispensaries.push({id:  n.dispensaries[i].id, name:  n.dispensaries[i].name });
            } 

            for(var i = 0; i <  n.employees.length; i++){ 
              var can_be_deleted = i == 0 ?  false : true; //first parent user account cannot be deleted 
              var item =  n.employees[i]; 
              var {dispensaries_ids , roles_ids} = this.convertDispensariesToIdString(item.dispensaries_json);   
                
              employees.push( {                
                id: item.id, 
                first_name: item.first_name,  
                last_name : item.last_name, 
                name:  item.first_name + " " + item.last_name,   
                address_1 : item.address_line_1, 
                address_2 : item.address_2,   //todo fix fieldname 
                phone: item.phone,  
                state : item.state,
                city : item.city,
                zip : item.zip, 
                email: item.email, 
                roles: roles_ids,
                dispensaries : dispensaries_ids,
                can_be_deleted : can_be_deleted
                } );          

                //todos: 
                //add upload variables here later   
            } 

             //console.log("employee list init ", employees);
    } 
  


    return Promise.resolve([employees, dispensaries,roles]);      
  } 

}
