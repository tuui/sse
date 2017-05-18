package org.tuui.sse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
public class BetController {

	@Autowired
	private ScheduledService scheduledService;

	@GetMapping("bets")
	public List<Bet> getBets() {
		List<Bet> bets = new ArrayList<Bet>();
		bets.add(generateBet());
		bets.get(0).getId();
		return bets;
	}

	@GetMapping("place")
	public Flux<Bet> place(){
		return scheduledService.getMessages();
	}

	private Bet generateBet() {
		return Bet.builder()
				.id(1L)
				.betOfferId(123L)
				.username("john1")
				.stake(new BigDecimal(200))
				.odds(120)
				.status(Bet.StatusEnum.PENDING)
				.placed(OffsetDateTime.now())
				.build();
	}
}
