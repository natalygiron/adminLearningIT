import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  checked = false;
  
  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  },
  {
    Validators //: crear validator kk
  }
  );

  constructor(private _router: Router,
              private userService: UserService,
              private _snackbar: MatSnackBar,
              private fb: FormBuilder) { }

  ngOnInit(): void {}

  onBack(): void {
    this._router.navigate(['/home']);
  }

  login() {
    if( this.loginForm.invalid ){
      return this.openSnackBar('Invalid fields in the form. Please check.');
    }

    this.userService.login(this.loginForm.value)
      .subscribe( resp => {
        
        if(this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        // Go to dashboard
        this._router.navigateByUrl('/home');

      }, (err) => {
        // if( this.loginForm.get('email')?.invalid) {
        //   this.openSnackBar(`${err.error.errors[0].msg}`);
        // } else if ( this.loginForm.get('password')?.invalid) {
        //   this.openSnackBar(`${err.error.errors[0].msg}`);
        // }
        console.log(err.error)
      })
  }

  openSnackBar( msg: string): any {
    this._snackbar.open(`${msg}`, 'Close', {
      duration: 3000,
    });
  }

}
