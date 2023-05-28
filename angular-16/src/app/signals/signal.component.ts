import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import {
  Route,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PeopleService, GitHubService } from './services';
import { PeopleComponent, MemberComponent } from './components';

export const signalRoutes = () =>
  [
    { path: '', redirectTo: 'people', pathMatch: 'full' },
    { path: 'people', component: PeopleComponent },
    { path: 'members', component: MemberComponent },
  ] as Route[];

@Component({
  standalone: true,
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  imports: [
    JsonPipe,
    NgIf,
    NgFor,
    AsyncPipe,
    HttpClientModule,
    MemberComponent,
    PeopleComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [PeopleService, GitHubService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignalComponent {
  protected displayMembers = false;
}
