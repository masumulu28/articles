import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-required-input',
  template: `{{ internalName }}`,
})
export class RequiredInputComponent {
  /**
   * What the hack is this? "!"
   * We already mark as required but TS compiler still don't know that.
   * decarator not effects to the TS compiler. For type safety we need to use "!".
   * Angular team will bring a new function like input('name')...
   */
  @Input({ required: true, alias: 'name' }) internalName!: string;
}

@Component({
  standalone: true,
  selector: 'my-app',
  imports: [RequiredInputComponent],
  template: `<app-required-input [name]="'Masum'" />`,
})
export default class NameComponent {}
