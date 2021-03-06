import { NgModule } from '@angular/core';
import { AdminNewsEditorComponent } from './admin-news-editor/admin-news-editor.component';
import { AdminNewsListComponent } from './admin-news-list/admin-news-list.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsListComponent } from './news-list/news-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RoleGuardService } from '../core/role-guard.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            { path: 'news', component: NewsListComponent },
            { path: 'news/:id', component: NewsDetailsComponent },
            { path: 'admin/news', component: AdminNewsListComponent, canActivate: [RoleGuardService] },
            { path: 'admin/news/:id', component: AdminNewsEditorComponent, canActivate: [RoleGuardService] },
            { path: 'admin/news/new', component: AdminNewsEditorComponent, canActivate: [RoleGuardService] }
        ])
    ],
    declarations: [
        AdminNewsEditorComponent,
        AdminNewsListComponent,
        NewsDetailsComponent,
        NewsListComponent
    ]
})
export class NewsModule { }
