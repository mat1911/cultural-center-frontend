import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IEnrolledUser } from '../enrolled-user';

@Component({
  selector: 'app-enrolled-users-list',
  templateUrl: './enrolled-users-list.component.html',
  styleUrls: ['./enrolled-users-list.component.css']
})
export class EnrolledUsersListComponent{

  @Input() users$: Observable<IEnrolledUser[]>;
  @Output() delistButtonClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  delistUser(userId: number): void{
    this.delistButtonClicked.emit(userId);
  }

}
