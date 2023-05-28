import { AsyncPipe, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { REQ_TOKEN } from './req.token';

interface User {
  id: number;
  name?: string;
  login: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, AsyncPipe, HttpClientModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly URL = inject(REQ_TOKEN);
  private readonly http = inject(HttpClient);

  readonly users$ = this.http.get<User[]>(this.URL).pipe(delay(1000));
}
