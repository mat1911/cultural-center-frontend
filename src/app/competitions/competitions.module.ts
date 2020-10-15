import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminCompetitionListComponent } from './admin-competition-list/admin-competition-list.component';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { CompetitionDetailsComponent } from './competition-details/competition-details.component';
import { CompetitionContestantsListComponent } from './competition-contestants-list/competition-contestants-list.component';
import { CompetitionNewContestantComponent } from './competition-new-contestant/competition-new-contestant.component';
import { ContestantResultComponent } from './contestant-result/contestant-result.component';
import { AdminCompetitionEditorComponent } from './admin-competition-editor/admin-competition-editor.component';
import { AdminAcceptedCompetitionsListComponent } from './admin-accepted-contestants-list/admin-accepted-contestants-list.component';
import { AdminNotAcceptedContestantsListComponent } from './admin-not-accepted-contestants-list/admin-not-accepted-contestants-list.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            { path: 'competitions', component: CompetitionListComponent },
            { path: 'competitions/:id', component: CompetitionDetailsComponent },
            { path: 'competitions/contestant/new/:id', component: CompetitionNewContestantComponent },
            { path: 'contestant/result/:competitionId/:userId', component: ContestantResultComponent},
            { path: 'admin/competitions', component: AdminCompetitionListComponent},
            { path: 'admin/competitions/:id', component: AdminCompetitionEditorComponent },
            { path: 'admin/competitions/new', component: AdminCompetitionEditorComponent }
        ])
    ],
    declarations: [
        AdminCompetitionListComponent,
        CompetitionListComponent,
        CompetitionDetailsComponent,
        CompetitionContestantsListComponent,
        CompetitionNewContestantComponent,
        ContestantResultComponent,
        AdminCompetitionEditorComponent,
        AdminAcceptedCompetitionsListComponent,
        AdminNotAcceptedContestantsListComponent
    ]
})
export class CompetitionsModule { }
