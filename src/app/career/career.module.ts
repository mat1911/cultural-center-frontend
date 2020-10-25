import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminJobOffersListComponent } from './admin-job-offers-list/admin-job-offers-list.component';
import { AdminJobOfferEditorComponent } from './admin-job-offer-editor/admin-job-offer-editor.component';
import { AdminApplicationListComponent } from './admin-application-list/admin-application-list.component';
import { JobOffersListComponent } from './job-offers-list/job-offers-list.component';
import { JobOfferDetailsComponent } from './job-offer-details/job-offer-details.component';
import { ApplicantEditorComponent } from './applicant-editor/applicant-editor.component';
import { AdminApplicantDetailsComponent } from './admin-applicant-details/admin-applicant-details.component';
import { RoleGuardService } from '../core/role-guard.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            { path: 'careers', component: JobOffersListComponent },
            { path: 'careers/:id', component: JobOfferDetailsComponent },
            { path: 'careers/:id/applicant/new', component: ApplicantEditorComponent },
            { path: 'admin/careers', component: AdminJobOffersListComponent, canActivate: [RoleGuardService] },
            { path: 'admin/careers/:id', component: AdminJobOfferEditorComponent, canActivate: [RoleGuardService] },
            { path: 'admin/careers/new', component: AdminJobOfferEditorComponent, canActivate: [RoleGuardService] },
            { path: 'admin/careers/:id/applicants', component: AdminApplicationListComponent, canActivate: [RoleGuardService] },
            { path: 'admin/careers/:jobOfferId/applicants/:applicantId', component: AdminApplicantDetailsComponent, canActivate: [RoleGuardService] }
        ])
    ],
    declarations: [
    AdminJobOffersListComponent,
    AdminJobOfferEditorComponent,
    AdminApplicationListComponent,
    JobOffersListComponent,
    JobOfferDetailsComponent,
    ApplicantEditorComponent,
    AdminApplicantDetailsComponent]
})
export class CareerModule { }
