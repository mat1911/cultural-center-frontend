import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { TokenService } from 'src/app/core/token.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginFormGroup: FormGroup

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenService: TokenService, private router: Router) {
    this.loginFormGroup = formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
  }


  get loginForm(){
    return this.loginFormGroup.controls;
  }

  onSubmit(): void{
    if (this.loginFormGroup.invalid){
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    console.log(this.loginFormGroup.value)

    this.authService.login(this.loginFormGroup.value).subscribe({
      next: response => {
        this.tokenService.saveTokens(response);
        this.router.navigate(['/news']);
      },
      error: err => console.log(err)
    })
  }

}
