
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyFormsModule } from '../forms/forms.module';
import { SharedModule } from '../shared/shared.module';
import { UserOptionsComponent } from './user-options/user-options.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { RemindPasswordComponent } from './remind-password/remind-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RoleGuardService } from '../core/role-guard.service';




@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MyFormsModule,
        RouterModule.forChild([
            { path: 'options/:userId', component: UserOptionsComponent },
            { path: 'admin', component: AdminMenuComponent, canActivate: [RoleGuardService] },
            { path: 'forgot', component: ForgotPasswordComponent },
            { path: 'remind-password', component: RemindPasswordComponent }
        ])
    ],
    declarations: [
        UserOptionsComponent,
        AdminMenuComponent,
        RemindPasswordComponent,
        ForgotPasswordComponent
    ]
})
export class UserModule { }
