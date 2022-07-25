

export interface IEmployeeBuildData{
  employeeListTable : any; 
  dispensaryListSelection : any; 
}


 
export interface IEmployeeInformation {
  id: number;  
  name: string; 
  phone: string; 
  email: string; 

  first_name?: string; 
  last_name?: string;
  address_1?: string;
  address_2?: string;
  city?:string;
  state?:string;
  zip?:string;

  identification_number?: string;
  identification_state_issue?: string;
  identification_file?: {
    fileName: string; 
    fileType: string;
    file: any;
  };


  roles: string; //string ids separated by comma 
  dispensaries: string;  //string ids separated by comma

  roles_caption?: string[]; 
  dispensaries_caption?: string[];    

  can_be_deleted :  boolean;
}

export interface IEmployeeRoles{
  id: number;  
  name: string; 
}

export interface IEmployeeDispensaries{
  id: number;  
  name: string; 
}
 

export interface FieldSelectInterface {
  value: number; //id 
  caption: string;   
}
 