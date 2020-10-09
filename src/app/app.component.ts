import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './core/auth.service';
import { NotificationService } from './core/notification.service';
import { INotification } from './shared/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  notification$: Subject<INotification>;
  title = 'cultural-center-frontend';

  constructor(private notificationService: NotificationService){
    this.notification$ = notificationService.notification;
  }

  onCloseNotification(): void{
    this.notification$.next(null);
  }

}
