import {Component, OnInit, Input, Output} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  constructor(public activeModal: NgbActiveModal)
  { }

  ngOnInit(): void {
  }

  passBack(action) {
    this.activeModal.close(action);
  }

}
