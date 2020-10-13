import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticlesDetailsComponent } from './articles-details/articles-details.component';
import { ArticlesEditorComponent } from './articles-editor/articles-editor.component';
import { AdminAcceptedArticlesListComponent } from './admin-accepted-articles-list/admin-accepted-articles-list.component';
import { AdminArticleManagerComponent } from './admin-article-manager/admin-article-manager.component';
import { AdminNotAcceptedArticlesListComponent } from './admin-not-accepted-articles-list/admin-not-accepted-articles-list.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            { path: 'articles', component: ArticlesListComponent },
            { path: 'articles/new', component: ArticlesEditorComponent },
            { path: 'articles/:id', component: ArticlesDetailsComponent},
            { path: 'articles/edit/:id', component: ArticlesEditorComponent },
            { path: 'admin/articles', component: AdminArticleManagerComponent }
        ])
    ],
    declarations: [
        ArticlesListComponent,
        ArticlesDetailsComponent,
        ArticlesEditorComponent,
        AdminAcceptedArticlesListComponent,
        AdminArticleManagerComponent,
        AdminNotAcceptedArticlesListComponent
    ]
})
export class ArticlesModule { }
