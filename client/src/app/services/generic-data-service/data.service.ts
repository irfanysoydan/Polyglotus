import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService<T> {
  private data$ = new Subject<T>();
  sendData(data: T) {
    this.data$.next(data);
  }

  clearData() {
    this.data$.next();
  }

  getData(): Observable<T> {
    return this.data$.asObservable();
  }
}
