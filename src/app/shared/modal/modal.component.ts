import { Component, OnInit, Output, EventEmitter, Input, TemplateRef, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() okClicked: EventEmitter<any> = new EventEmitter();
  @ViewChild('content') content: TemplateRef<any>;
  @Input() modalTitle: any;
  @Input() showOkButton: boolean = true;
  @Input() showCloseButton: boolean = true;
  @Input() centered: boolean = true;
  @Input() keyboard: boolean = true;
  @Input() backdrop: boolean | 'static' = true

  constructor(private modalService: NgbModal) {}

  ngOnInit(){}

  open(content) {
    this.modalService.open(content, {centered: this.centered, keyboard: this.keyboard, backdrop: this.backdrop})
  }

  openModal(): void{
    this.modalService.open(this.content, {centered: this.centered, keyboard: this.keyboard, backdrop: this.backdrop})
  }

  closeModalAndEmit(): void{
    this.modalService.dismissAll();
    this.okClicked.emit();
  }

  closeModal(): void{
    this.modalService.dismissAll();
  }

}
