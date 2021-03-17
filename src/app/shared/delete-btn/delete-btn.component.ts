import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.scss']
})
export class DeleteBtnComponent  {

  canDelete: boolean;

  @Output() delete = new EventEmitter<boolean>();

  cancel() {
    this.canDelete = false;
  }

  prepareForDelete() {
    this.canDelete = true;
  }

  deleteBoard() {
    this.delete.emit(true);
    this.canDelete = false;
  }
}
