import {Bet} from './bet.model';

export class SearchBetsResponse {
	collectionSize: number;
	bets: Bet[];
}