import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {Bet} from '../shared/bet.model';
import {BetService} from '../shared/bet.service';


@Component({
    selector: 'sse-live',
    templateUrl: './live.component.html',
    providers: [BetService]
})

export class LiveComponent implements OnInit, OnDestroy {

    readonly max_list_size: number = 20;

    placedBets: Bet[] = [];
    private subscription: Subscription;
    private zone: NgZone = new NgZone({enableLongStackTrace: false});

    constructor(private betService: BetService) {
    }

    ngOnInit() {
        console.log('ngOnInit');
        this.subscription = this.betService.getLiveBetsObserver().subscribe({
            next: (bet: Bet) => {
                this.zone.run(() => {
                    this.addPlacedBet(bet);
                });
            },
            error: (err: any) => console.error(err)
        });
    }

    ngOnDestroy(): void {
        console.log('ngOnDestroy');
        this.subscription.unsubscribe();
    }

    private addPlacedBet(bet: Bet): void {
        this.placedBets.unshift(bet);
        if (this.placedBets.length > this.max_list_size) {
            this.placedBets.splice(-1, this.placedBets.length - this.max_list_size);
        }
    }
}
