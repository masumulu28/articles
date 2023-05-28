import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-input-binding',
  template: `<h1>Router Param & Required Input: {{ title }}</h1>`,
})
export default class InputBindingComponent {
  @Input() title: string | undefined | null;
}

/**
  {
    path: 'req-inputs/:title',
    loadComponent: () => import('./components/required-inputs.component'),
    resolve: { title: () => 'Hello World!' },
  },

  Priority
  1: resolve: { title: () => 'masum' },
  2: route param: localhost/input-binding/masum
  3: query param: localhost/input-binding?title=masum
 */
