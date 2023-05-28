import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Member } from '../models';

const GITHUB_API = 'https://api.github.com/orgs/volosoft/public_members';

@Injectable()
export class GitHubService {
  protected readonly http = inject(HttpClient);

  protected readonly members$ = this.http.get<Member[]>(GITHUB_API);
  members = toSignal(this.members$, { initialValue: [] });
}
