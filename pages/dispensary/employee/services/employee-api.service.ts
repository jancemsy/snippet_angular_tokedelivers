import { OnDestroy, resolveForwardRef } from '@angular/core';
import { Injectable } from '@angular/core';
import {  HttpHeaders, HttpClient  } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service'; 
import { ApiService} from 'src/app/services/core/api.service';
import { IEmployeeInformation, FieldSelectInterface, IEmployeeDispensaries,IEmployeeRoles ,IEmployeeBuildData} from 'src/app/models'; 
 


@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService{
  apiBase = environment.apiBase;
  private userinfo;   


  constructor(
    private _api: ApiService,
    private _localStorage: LocalStorageService
  ) { 
      this.userinfo =  this._localStorage.retrieveItem('loginInfo');        
   } 

  
 
   public async get()  : Promise <any>{       
    return  new Promise(resolve =>{
        this._api.get(`/company/${this.userinfo.user_company_id}/employees`).subscribe(
          (successResponse: any) => { 
            console.log(" employees ----> ", successResponse); 
            resolve(successResponse);
          },
          (errorResponse: any) => {  
            console.log(" employees error ----> ",errorResponse);  
            resolve({success:false, errors : this.convertErrorMessages(errorResponse) });  
          }); 
    }); 
  }

 

   
   public async update(f:any) : Promise <any>{  
    let dispensaries : any =  this.convertDispensaries(f);
  
    const params = { 
            id : f.id, 
            company_id : this.userinfo.user_company_id,
            employee_id : f.id, 
            email :  f.email, 
            phone_number: f.phone,  
            first_name :  f.first_name,
            last_name  :   f.last_name,
            address_line_1 :  f.address_1,
            address_line_2 :   f.address_2,
            city      :   f.city, 
            zip       :   f.zip,
            state     :    f.state,
            dispensaries : dispensaries,
            
            identification_number:  f.identification_number ? f.identification_number : null,
            identification_state_issue: f.identification_state_issue ? f.identification_state_issue : null,
            identification_file: f.identification_file ? f.identification_file : null 

    };   
 
    console.log("sending update employee ...", params);
    return  new Promise(resolve =>{
      return this._api.post(`/employee/update`, params  ) .subscribe(
        (successResponse: any) => { 
          console.log(successResponse);
          resolve(successResponse);     
        },
        (errorResponse: any) => { 
          console.log(errorResponse); 
          resolve({success:false, errors : this.convertErrorMessages(errorResponse) }); 
        }
      );
    });  
  }
 

 
  
  public async add(f : IEmployeeInformation) : Promise <any>{    
    let dispensaries : any[] =  this.convertDispensaries(f);
  
    const params = { 
      company_id : this.userinfo.user_company_id,
      email :  f.email, 
      phone_number: f.phone,  
      first_name :  f.first_name,
      last_name  :   f.last_name,
      address_line_1: f.address_1,
      address_line_2 : f.address_2, 
      city      :   f.city, 
      zip       :   f.zip,
      state     :    f.state,
      dispensaries : dispensaries,

      identification_number:  f.identification_number ? f.identification_number : null,
      identification_state_issue: f.identification_state_issue ? f.identification_state_issue : null,
      identification_file: f.identification_file ? f.identification_file : null  
   };    

console.log(params);
 
    console.log("sending new employee ...", params);
    return  new Promise(resolve =>{
      return this._api.post(`/employee/new`, params  ) .subscribe(
        (successResponse: any) => { 
          console.log(successResponse);
          resolve(successResponse);     
        },
        (errorResponse: any) => { 
          console.log(errorResponse); 
          resolve({success:false, errors : this.convertErrorMessages(errorResponse) }); 
        }
      );
    });  
  }



  public async delete(employee_id : number) : Promise <any>{  
    return  new Promise(resolve =>{
      return this._api.post(`/employee/delete`,{ employee_id}) .subscribe(
        (successResponse: any) => { 
          console.log("get employees  ...", successResponse);
          resolve(successResponse);     
        },
        (errorResponse: any) => { 
          console.log("get employees  ...", errorResponse); 
          resolve({success:false, errors : this.convertErrorMessages(errorResponse) }); 
        }
      );
    });   
  } 



  

  private convertDispensaries(f :IEmployeeInformation) : any{
    var dispensaries  = []; 

    //convert dispenaries field .. 
    if( f.roles !== ""){
     let rids = f.roles.split(",");  
     let dids = f.dispensaries.split(",");    
     for(var i = 0; i < rids.length; i++) {
         dispensaries.push({dispensary_id : dids[i] , role_id : rids[i] });
     } 
    }

    //return   [{dispensary_id: "1", role_id: "3"}];
    return dispensaries; 
  }

 
  private convertErrorMessages(objs){
    var arr = [];
    for(var key in objs.message){
      arr.push({ "field" : key , "message" : objs.message[key][0]});
    }  
    return arr; 
  } 
  


}
