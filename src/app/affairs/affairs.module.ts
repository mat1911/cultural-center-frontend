import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AffairsListComponent } from './affairs-list/affairs-list.component';
import { AdminAffairsListComponent } from './admin-affairs-list/admin-affairs-list.component';
import { AdminAffairsEditorComponent } from './admin-affairs-editor/admin-affairs-editor.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NgbModule,
        RouterModule.forChild([
            { path: 'affairs', component: AffairsListComponent },
            { path: 'admin/affairs', component: AdminAffairsListComponent },
            { path: 'admin/affairs/:id', component: AdminAffairsEditorComponent},
            { path: 'admin/affairs/new', component: AdminAffairsEditorComponent}
        ])
    ],
    declarations: [
        AffairsListComponent,
        AdminAffairsListComponent,
        AdminAffairsEditorComponent
    ]
})
export class AffairsModule { }
