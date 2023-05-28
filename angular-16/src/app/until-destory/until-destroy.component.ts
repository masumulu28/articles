import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';
import { TimerDirective } from './take-until-destroy.directive';

@Component({
  standalone: true,
  selector: 'app-until-destory',
  imports: [TimerDirective],
  template: 'Time: <span timer></span>',
})
export default class UntilDestoryComponent {
  private readonly destroyRef = inject(DestroyRef);
  constructor() {
    this.destroyRef.onDestroy(console.clear);
    //Timer'll stop when component is destroyed
    timer(0, 1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(console.log);
  }
}
