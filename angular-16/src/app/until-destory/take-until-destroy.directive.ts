import { Directive, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[timer]',
})
export class TimerDirective {
  private readonly elementRef = inject(ElementRef);

  constructor() {
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe(
        (count) => (this.elementRef.nativeElement.innerHTML = count.toString())
      );
  }
}
