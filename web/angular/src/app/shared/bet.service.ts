import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Bet} from './bet.model';
import {SearchBetsRequest} from './search-bets-request.model';
import {SearchBetsResponse} from './search-bets-response.model';

const EventSource: any = window['EventSource'];

@Injectable()
export class BetService {

    constructor(private http: Http) {
    }

    searchBets(request: SearchBetsRequest): Observable<SearchBetsResponse> {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post('api/search', JSON.stringify(request), {headers: headers})
            .map((r: Response) => r.json() as SearchBetsResponse[])
            .catch((error: any) => {
                console.error('An error occurred', error);
                return Observable.throw(error.message || error);
            });
    }

    getLiveBetsObserver(): any {
        return Observable.create((observer: any) => {
            const eventSource = new EventSource('/api/live');
            eventSource.onmessage = (bet: any) => observer.next(JSON.parse(bet.data) as Bet);
            eventSource.onerror = (error: any) => observer.error(error);

            return () => {
                console.log('close eventSource');
                eventSource.close();
            };
        });
    }
}