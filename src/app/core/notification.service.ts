import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { INotification } from '../shared/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notification: Subject<INotification> = new BehaviorSubject(null);

  constructor() { }

  dispatch(INotification): void{
    this.notification.next(INotification);
  }
}
