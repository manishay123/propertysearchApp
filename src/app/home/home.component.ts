import { Component } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  searchForm: FormGroup = new FormGroup({

  });

  properties!: Property[];
  constructor(private toastr: ToastrService, private appService: AppServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.appService.getAllProperties().subscribe(data => {

      console.log(data);
      this.properties = data;
    })


    this.searchForm = this.formBuilder.group(
      {
        firstName: [''],
        lastname: [''],
        address: [''],
        type: [''],
      }
    );


  }

  onsearch(): void {


  }


  deleteItem(id: any): void {

    this.appService.deleteProperty(id).subscribe(data => {
      const index = this.properties.findIndex(x => x.id = id);
      this.properties.splice(index, 1)
      console.log(data);
      this.toastr.success("Successfully Delete");

    });

  }


}

interface Property {
  id: number;
  address: string;
  type: string;
  description: string;
  taxAmount: number;
  taxStatus: boolean;
  propertyOwner: PropertyOwner;


}

interface PropertyOwner {

  id: number;
  firstName: string;
  lastName: string;

}
