import { CustomerCardIdentification } from './customer-card-identification.model';

export class CustomerCardIdentificationClass implements CustomerCardIdentification {

  public type: string = "";
  public name: string = "";
  public id: number = 0;
  public number: string = "";
  public state: string = "";
  public state_code: string = "";
  public birthdate: string = "";
  public expiration: string = "";
  public file_id: string = "";
  public file_path: string = "";
  public file_back_id: string = "";
  public file_back_path: string = "";

  constructor(type = "", name = "", id = 0, state = null) {
    this.type = type;
    this.name = name;
    this.id = id;
    this.state = state;
  }

  // This function will handle the data from the endpoint customer
  // then populate the class necessary fields
  public setData(item: any) {

    let details         = item.identification_details;

    this.type           = details.type;
    this.name           = details.name;
    this.id             = item.identification_id;
    this.number         = details.number;
    this.state          = details.state;
    this.state_code     = '?';
    this.birthdate      = details.birth_date;
    this.expiration     = details.expiry_date;
    this.file_id        = details.files.front_file.id;
    this.file_path      = details.files.front_file.path;

    // check if its available
    if (details.files.back_file) {
      this.file_back_id   = details.files.back_file.id;
      this.file_back_path = details.files.back_file.path;
    }
  }

  // This function will provide dummy fields for you
  public getDummy() {
    this.type = "Driver's License";
    this.name = "John Doe";
    this.id = 1;
    this.state = "New York";
    return this;
  }

  // This function will return a specific label using a card type
  public getTypeLabel() {
    let label = "";
    switch (this.type) {
      case 'driver-license':
        label = "Driver's License";
        break;
      case 'medical':
        label = "Medical";
        break;
      // TODO add more card type here
    }

    return label;
  }
}