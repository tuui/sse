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

	max_list_size:number = 20;

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
		    	this.placedBets.unshift(bet);
		    	if(this.placedBets.length > this.max_list_size){
		    		this.placedBets.splice(-1, this.placedBets.length - this.max_list_size);
		    	}
		    });

		  },
		  error: (err:any) => console.error(err)
		});
	}

	ngOnDestroy(): void {
		console.log('ngOnDestroy');
		this.subscription.unsubscribe();
	}
}
