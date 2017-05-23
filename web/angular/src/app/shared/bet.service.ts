import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Bet} from './bet.model';

@Injectable()
export class BetService {

  constructor(private http: Http) {}

  searchHistory(): Observable<Bet[]> {
    return this.http
      //.get('app/heroes/?name=${term}')
      .get('api/history')
      .map((r: Response) => r.json() as Bet[])
      .catch((error: any) => {
          console.error('An error occurred', error);
          return Observable.throw(error.message || error);
      });
  }
}