import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';

import { DropdownComponent } from '../../shared';
import { PeopleService } from '../services';

const OPTIONS = { initialValue: 'Design' };

@Component({
  standalone: true,
  selector: 'app-people',
  template: `
    <div class="row collapse show" id="signalSample">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <div class="card p-2 mb-2">
          <h4>Department</h4>
          <select class="form-select" [formControl]="department">
            <option value="">All department</option>
            <option
              *ngFor="let item of peopleService.departments()"
              [value]="item.name"
            >
              {{ item.name }}
            </option>
          </select>
        </div>

        <div class="card p-2">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Actions</th>
                <th>Name</th>
                <th>Department</th>
              </tr>
            </thead>
            <ng-container
              *ngIf="{
                people: peopleService.people$ | async,
                count: peopleService.count$ | async
              } as vm"
            >
              <tbody class="cursor-pointer">
                <tr *ngIf="vm.count === 0">
                  <td colspan="3" class="text-center">No record found</td>
                </tr>
                <tr *ngFor="let person of vm.people">
                  <td>
                    <app-dropdown
                      [id]="person.id"
                      (remove)="removeRxjs($event)"
                    />
                  </td>
                  <td>{{ person.name }}</td>
                  <td>{{ person.department }}</td>
                </tr>
              </tbody>

              <tfoot>
                <tr>
                  <td colspan="3">Total count: {{ vm.count }}</td>
                </tr>
              </tfoot>
            </ng-container>
          </table>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    JsonPipe,
    ReactiveFormsModule,
    DropdownComponent,
  ],
})
export class PeopleComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly peopleService = inject(PeopleService);

  protected readonly department = this.fb.control('Design');
  private readonly changed = toSignal(this.department.valueChanges, OPTIONS);

  constructor() {
    effect(
      () => {
        this.peopleService.filterByDepartmentSignal(this.changed());
        this.peopleService.filterByDepartmentRxjs(this.changed());
      },
      { allowSignalWrites: true }
    );
  }

  ngAfterViewInit(): void {
    //Add for signal
    this.peopleService.addSignal({
      id: 15,
      name: 'Bige-222',
      department: 'Design',
    });

    //Add for rxjs
    this.peopleService.addRxjs({
      id: 15,
      name: 'Bige-222',
      department: 'Design',
    });
  }

  removeSignal(id: number) {
    this.peopleService.removeSignal(id);
  }

  removeRxjs(id: number) {
    this.peopleService.removeRxjs(id);
  }
}
