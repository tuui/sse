import {Component,OnInit} from '@angular/core';
import {BetService} from '../shared/bet.service';
import {Bet} from '../shared/bet.model';
import {SearchBetsRequest} from '../shared/search-bets-request.model';
import {SearchBetsResponse} from '../shared/search-bets-response.model';

@Component({
	selector: 'sse-history',
	templateUrl: './history.component.html',
	providers: [BetService]
})

export class HistoryComponent implements OnInit{

	bets: Bet[] = [];
	collectionSize: number = 10;
	page: number = 1;
	searchBetsRequest: SearchBetsRequest = new SearchBetsRequest();

	constructor(private betService: BetService) {
	}

	ngOnInit(): void {
		this.searchBetsRequest.pageNr = 1;
		this.searchBetsRequest.pageSize = 10;
   	 	this.betService.searchBets(this.searchBetsRequest)
   	 		.subscribe((response:SearchBetsResponse) => {
   	 			this.bets = response.bets
   	 			this.collectionSize = response.collectionSize;
   	 		});
	}

	pageChange(): void {
		console.log('pageChange');
		this.betService.searchBets(this.searchBetsRequest)
   	 		.subscribe((response:SearchBetsResponse) => {
   	 			this.bets = response.bets
   	 			this.collectionSize = response.collectionSize;
   	 		});
	}
}
