import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dropdown',
  template: ` <div class="dropdown">
    <div class="btn-group">
      <button
        type="button"
        class="btn btn-sm btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        Actions
      </button>
      <ul class="dropdown-menu">
        <li>
          <button class="dropdown-item" (click)="removeOnClick(id)">
            <i class="fa fa-trash text-danger"></i>
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>`,
})
export class DropdownComponent {
  @Input() id!: number;
  @Output() remove = new EventEmitter<number>();

  removeOnClick(id: number) {
    this.remove.emit(id);
  }
}
