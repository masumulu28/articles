import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { GitHubService } from '../services';

@Component({
  standalone: true,
  selector: 'app-member',
  template: `
    <div class="form-group mt-2 mb-2">
      <input
        type="text"
        class="form-control"
        placeholder="Type a username.."
        [formControl]="searchTerm"
      />
    </div>
    <div class="row">
      <div
        class="col-sm-12 col-md-6 col-lg-3 mb-2"
        *ngFor="let member of gitHubService.members()"
      >
        <div class="card card-member">
          <div class="card-header text-center">
            <a
              class="text-primary text-decoration-none"
              [href]="member.html_url"
              target="_blank"
              >{{ member.login }}
            </a>
          </div>
          <div class="card-body d-flex justify-content-center">
            <img
              width="250"
              height="250"
              style="border-radius: 10rem; border: 0.1rem solid #ccc"
              [src]="member.avatar_url"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberComponent {
  protected readonly gitHubService = inject(GitHubService);

  protected readonly searchTerm = new FormControl('', { nonNullable: true });
  private readonly searchChanged = toSignal(
    this.searchTerm.valueChanges.pipe(distinctUntilChanged(), debounceTime(250))
  );

  constructor() {
    effect(() => {
      const val = this.searchChanged();
      if (!!val) console.log(val);
    });
  }
}
