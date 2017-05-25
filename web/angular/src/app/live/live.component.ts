import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import {Subscription}  from 'rxjs/Rx';
import {Bet} from '../shared/bet.model';
import {BetService} from '../shared/bet.service';


@Component({
	selector: 'sse-live',
	templateUrl: './live.component.html',
	providers: [BetService]
})

export class LiveComponent implements OnInit, OnDestroy{

	placedBets: Bet[] = [];
	subscription: Subscription;
 	zone: NgZone;

	constructor(private betService: BetService) {		
	}

	ngOnInit(){
  		console.log('ngOnInit');
  		this.zone = new NgZone({enableLongStackTrace: false});

		this.subscription = this.betService.getLiveBetsObserver().subscribe({
		  next: (bet:Bet) => {
		    this.zone.run(() => {
		    	this.placedBets.push(bet)
		    });

		  },
		  error: (err:any) => console.error('something wrong occurred: ' + err)
		});
	}

	ngOnDestroy(): void {
		console.log('ngOnDestroy');
		//this.subscription.unsubscribe();
	}
}
