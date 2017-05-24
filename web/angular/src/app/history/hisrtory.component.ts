import {Component,OnInit} from '@angular/core';
import {BetService} from '../shared/bet.service';
import {Bet} from '../shared/bet.model';

@Component({
	selector: 'sse-history',
	templateUrl: './history.component.html',
	providers: [BetService]
})

export class HistoryComponent implements OnInit{

	bets: Bet[] = [];

	constructor(private betService: BetService) {
	}

	ngOnInit(): void {
   	 	this.betService.searchHistory().subscribe(historyBets => this.bets = historyBets);
	}
}
