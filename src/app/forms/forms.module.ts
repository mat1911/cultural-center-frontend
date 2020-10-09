import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFormComponent } from './password-form/password-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PasswordFormComponent,
    RegisterFormComponent,
    ProfileFormComponent,
    LoginFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    RouterModule.forChild(
      [
        { path: 'register', component: RegisterFormComponent },
        { path: 'login', component: LoginFormComponent }
    ]
    )
  ],
  exports: [
    PasswordFormComponent,
    RegisterFormComponent,
    LoginFormComponent
  ]
})
export class MyFormsModule { }
