import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IUser } from '../User';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.css']
})
export class UserSelectorComponent implements OnInit {

  @Output() choicesSubmitted: EventEmitter<number[]> = new EventEmitter<number[]>();
  users: IUser[];
  selectedUsersIds: number[] = []; 

  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;
  filter: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsersPage();
  }

  loadUsersPage(): void{
    console.log("TAK")
    console.log(this.filter);
    this.userService.getUsers(this.page, this.pageSize, this.filter).subscribe({
      next: responseData => {
        this.users = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }

  changeSelectedUser(userId: number): void{
    const index: number = this.selectedUsersIds.indexOf(userId);

    if(index === -1){
      this.selectedUsersIds.push(userId);
    }else{
      this.selectedUsersIds = this.selectedUsersIds.filter(id => id !== userId);
    }
  }

  onSubmit(): void{
    this.choicesSubmitted.emit(this.selectedUsersIds);
  }
}
