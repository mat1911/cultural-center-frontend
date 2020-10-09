import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { UserSelectorComponent } from './user-selector/user-selector.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EnrolledUsersListComponent } from './enrolled-users-list/enrolled-users-list.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NgbModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        ModalComponent,
        UserSelectorComponent,
        EnrolledUsersListComponent
    ],
    declarations: [ModalComponent, UserSelectorComponent, EnrolledUsersListComponent]
})
export class SharedModule { }