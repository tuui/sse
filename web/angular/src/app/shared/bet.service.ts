import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Bet} from './bet.model';

const EventSource: any = window['EventSource'];

@Injectable()
export class BetService {

  constructor(private http: Http) {
  }

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

  getLiveBetsObserver(): any {
    return Observable.create(observer => {
      const eventSource = new EventSource('/api/live');
      eventSource.onmessage = x => observer.next(JSON.parse(x.data) as Bet);
      eventSource.onerror = x => observer.error(x);

      return () => {
        eventSource.close();
      };
    });
  }
}