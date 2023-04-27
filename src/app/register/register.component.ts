import { AppServiceService } from './../app-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { AuthServiceService } from '../auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  submitted = false;
  errorMessage = '';

  constructor(private toastr: ToastrService, private authService: AuthServiceService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
      },
      {

        validator: ConfirmPasswordValidator("password", "confirmPassword")

      },

    );
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  onReset(): void {
    this.submitted = false;
    this.errorMessage = '';
    this.form.reset();
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.form.invalid) {
      return;
    }

    let data: any = {
      'userName': this.form.controls['username'].value,
      'password': this.form.controls['password'].value
    }

    this.authService.createCusomer(data).subscribe(data => {
      console.log(data);
      this.form.reset();
      this.router.navigate(['./login']);
      this.toastr.success("Successfully Registered.", 'Success')

    }, error => {

      this.errorMessage = error.error.message;
      this.toastr.error("Something went wrong.", 'Error')
    }
    )



  }


}
