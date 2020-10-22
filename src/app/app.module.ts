import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewsModule } from './news/news.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorsInterceptor } from './shared/http-errors.interceptor';
import { AffairsModule } from './affairs/affairs.module';
import { SharedModule } from './shared/shared.module';
import { MyFormsModule } from './forms/forms.module';
import { ArticlesModule } from './articles/articles.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { CareerModule } from './career/career.module'
import { JwtInterceptor } from './shared/jwt.interceptor';
import { GalleryModule } from './gallery/gallery.module';
import { UserModule } from './users/user.module';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationBarComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NewsModule,
    AffairsModule,
    ArticlesModule,
    CompetitionsModule,
    CareerModule,
    GalleryModule,
    UserModule,
    MyFormsModule,
    NgbModule,
    SharedModule,
    RouterModule.forRoot([
      { path: 'contact', component: ContactComponent},
      { path: '**', redirectTo: 'news', pathMatch: 'full'}
    ]),

  ],
  providers: [
    NgbActiveModal,
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
