import { DestroyRef, Injectable, OnDestroy, inject } from '@angular/core';

@Injectable()
export class AppService {
  destroyRef = inject(DestroyRef);

  destory(val: string): void {
    this.destroyRef.onDestroy(() => console.log(val));
  }
}
