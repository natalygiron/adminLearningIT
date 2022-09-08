import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    firstname: ['Olivia', Validators.required],
    lastname: ['Rodrigo', Validators.required],
    email: ['livpiscis@gmail.com', [Validators.required, Validators.email]],
    password: ['dejavu', Validators.required],
    password2: ['dejavu', Validators.required],
    terms: [ false , Validators.required],
  },{
    Validators: this.equalPasswords('password','password2')
  })

  constructor( private fb: FormBuilder,
               private _router: Router,
               private userService: UserService,
               private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm;
  }

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid || !this.registerForm.get('terms')?.value) {
      return this.openSnackBar('Invalid fields in the form. Please check.');
    } 
    
    this.userService.createUser(this.registerForm.value)
      .subscribe(resp => {
            this.openSnackBar('Posting your form, yey!')
            // Go to Home
            this._router.navigateByUrl('/home');

          }, (err) => {
            this.openSnackBar(`${err.error.msg}`)
            console.log(err.error)
          }
        )

    // continue 176 logout
  }

  invalidField( field: string ) {
    if( this.registerForm.get(field)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }
  
  invalidPasswords() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    
    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  equalPasswords(pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true})
      }

    }
  }

  acceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  openSnackBar( msg: string): any {
    this._snackbar.open(`${msg}`, 'Close', {
      duration: 3000,
    });
  }

}