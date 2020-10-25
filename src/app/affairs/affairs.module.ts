import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AffairsListComponent } from './affairs-list/affairs-list.component';
import { AdminAffairsListComponent } from './admin-affairs-list/admin-affairs-list.component';
import { AdminAffairsEditorComponent } from './admin-affairs-editor/admin-affairs-editor.component';
import { UserAffairsComponent } from './user-affairs/user-affairs.component';
import { RoleGuardService } from '../core/role-guard.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            { path: 'affairs', component: AffairsListComponent },
            { path: 'affairs/user/:userId', component: UserAffairsComponent},
            { path: 'admin/affairs', component: AdminAffairsListComponent, canActivate: [RoleGuardService] },
            { path: 'admin/affairs/:id', component: AdminAffairsEditorComponent, canActivate: [RoleGuardService] },
            { path: 'admin/affairs/new', component: AdminAffairsEditorComponent, canActivate: [RoleGuardService] }
        ])
    ],
    declarations: [
        AffairsListComponent,
        AdminAffairsListComponent,
        AdminAffairsEditorComponent,
        UserAffairsComponent
    ]
})
export class AffairsModule { }
