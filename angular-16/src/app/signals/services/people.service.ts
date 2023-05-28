import { Injectable, computed, signal } from '@angular/core';
import { Department, Person } from '../models';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

const PEOPLE: Person[] = [
  { id: 1, name: 'Armağan', department: 'Design' },
  { id: 2, name: 'Elanur', department: 'Design' },
  { id: 3, name: 'Seda', department: 'Design' },
  { id: 4, name: 'Mahmut', department: 'Frontend' },
  { id: 5, name: 'Masum', department: 'Frontend' },
  { id: 6, name: 'Barış', department: 'Frontend' },
  { id: 7, name: 'Halil İbrahim', department: 'Backend' },
  { id: 8, name: 'Enis', department: 'Backend' },
  { id: 9, name: 'Berkan', department: 'Backend' },
  { id: 10, name: 'Engincan', department: 'Backend' },
  { id: 11, name: 'Onur', department: 'Backend' },
  { id: 12, name: 'Bige', department: 'Marketing' },
  { id: 13, name: 'Tarık', department: 'Marketing' },
  { id: 14, name: 'Roo', department: 'Marketing' },
];

const DEPARTMENTS: Department[] = [
  { name: 'Design' },
  { name: 'Frontend' },
  { name: 'Backend' },
  { name: 'Marketing' },
];

@Injectable()
export class PeopleService {
  readonly departments = signal(DEPARTMENTS);

  //#region Signal
  readonly people = signal(PEOPLE);
  readonly count = computed(() => this.people().length);
  //#endregion

  //#region RxJS
  private readonly _peopleSubject = new BehaviorSubject<Person[]>(PEOPLE);
  get people$(): Observable<Person[]> {
    return this._peopleSubject.asObservable();
  }
  get count$(): Observable<number> {
    return this.people$.pipe(map((people) => people.length));
  }
  //#endregion

  filterByDepartmentSignal(name: string): void {
    name = name.toLowerCase();
    this.people.update(() =>
      !name
        ? PEOPLE
        : PEOPLE.filter(({ department }) => department.toLowerCase() === name)
    );
  }

  filterByDepartmentRxjs(name: string): void {
    name = name.toLowerCase();
    this._peopleSubject.next(
      !name
        ? PEOPLE
        : PEOPLE.filter(({ department }) => department.toLowerCase() === name)
    );
  }

  addSignal(person: Person): void {
    this.people.update((people) => [...people, person]);
  }

  addRxjs(person: Person): void {
    const { value } = this._peopleSubject;
    this._peopleSubject.next([...value, person]);
  }

  removeSignal(id: number): void {
    this.people.update((people) => people.filter((p) => p.id !== id));
  }

  removeRxjs(id: number): void {
    const { value } = this._peopleSubject;
    this._peopleSubject.next(value.filter((person) => person.id !== id));
  }
}
