import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../app-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent {

  property!: Property;
  propertyData!: Property;
  propertyId!: number;

  form: FormGroup = new FormGroup({
    'address': new FormGroup(''),
    'type': new FormGroup(''),
    'description': new FormGroup(''),
    'taxAmount': new FormGroup(''),
    'taxStatus': new FormGroup(''),
    'firstName': new FormGroup(''),
    'lastName': new FormGroup(''),
  });


  constructor(private toastr: ToastrService, private appService: AppServiceService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: any) => {
      this.propertyId = params['id'];
    });


    this.getdata();

    this.form = this.fb.group({
      address: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      taxAmount: ['', Validators.required],
      taxStatus: ['true'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });


  }

  async getdata(): Promise<void> {

    await this.appService.getProperty(this.propertyId).subscribe(data => {
      this.property = data;
      this.form.patchValue({
        address: this.property.address,
        type: this.property.type,
        description: this.property.description,
        taxAmount: this.property.taxAmount,
        taxStatus: this.property.taxStatus,
        firstName: this.property.propertyOwner.firstName,
        lastName: this.property.propertyOwner.lastName,
      });
    });




  }

  onSubmit() {
    this.propertyData = {
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

    console.log(this.propertyData);

    this.appService.editProperty(this.propertyData, this.propertyId).subscribe(data => {

      this.toastr.success("Property Updated Successfully.", 'Success');
      this.router.navigate(['/home']);

    }, error => {
      this.toastr.error("Something went wrong", 'Error');
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

