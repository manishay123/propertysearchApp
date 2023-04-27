import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {

  property!: Property;


  form: FormGroup = new FormGroup({
    'address': new FormGroup(''),
    'type': new FormGroup(''),
    'description': new FormGroup(''),
    'taxAmount': new FormGroup(''),
    'taxStatus': new FormGroup(''),
    'firstName': new FormGroup(''),
    'lastName': new FormGroup(''),
  });


  constructor(private toastr: ToastrService, private appService: AppServiceService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      address: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      taxAmount: ['', Validators.required],
      taxStatus: ['Yes'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });


  }

  onSubmit() {

    this.property = {
      address: this.form.controls['address'].value,
      type: this.form.controls['type'].value,
      description: this.form.controls['description'].value,
      taxAmount: this.form.controls['taxAmount'].value,
      taxStatus: this.form.controls['taxStatus'].value,
      propertyOwner: {
        firstName: this.form.controls['firstName'].value,
        lastName: this.form.controls['lastName'].value
      }
    };

    console.log(this.property);

    this.appService.addProperty(this.property).subscribe(data => {

      this.toastr.success("Property Added Successfully.", 'Success');
      this.router.navigate(['/home']);


    }, error => {
      this.toastr.success("Something went wrong", 'Error');
    })
  }


}



interface Property {
  address: string;
  type: string;
  description: string;
  taxAmount: number;
  taxStatus: boolean;
  propertyOwner: PropertyOwner;
}

interface PropertyOwner {
  firstName: string;
  lastName: string;
}

