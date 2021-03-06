import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { AdminGalleryListComponent } from './admin-gallery-list/admin-gallery-list.component';
import { RoleGuardService } from '../core/role-guard.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            { path: 'gallery', component: GalleryListComponent },
            { path: 'admin/gallery', component: AdminGalleryListComponent, canActivate: [RoleGuardService] }
        ])
    ],
    declarations: [
        GalleryListComponent,
        AdminGalleryListComponent
    ]
})
export class GalleryModule { }
