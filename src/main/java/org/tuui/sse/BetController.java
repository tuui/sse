package org.tuui.sse;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.util.function.Tuple2;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Stream;

@RequestMapping("api")
@RestController
public class BetController {

	private final static int BET_LIST_SIZE = 100;
	private final List<Bet> bets = new ArrayList<>();

	@GetMapping("/history")
	public List<Bet> history() {
		bets.add(generateBet());
		return bets;
	}

	@GetMapping(value = "/live", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<Bet> live() {
		Flux<Bet> betFlux = Flux.fromStream(Stream.generate(this::generateBet));
		Flux<Long> durationFlux = Flux.interval(Duration.ofSeconds(1));
		return Flux.zip(betFlux, durationFlux).map(Tuple2::getT1);
	}

	private Bet generateBet() {
		Bet bet = Bet.builder()
				.id(generateRandomLong())
				.eventId(generateRandomLong())
				.betOfferId(generateRandomLong())
				.username("user_" + generateRandomInt())
				.stake(new BigDecimal(generateRandomInt()))
				.odds(generateRandomInt() * 10)
				.status(Bet.StatusEnum.PENDING)
				.placed(OffsetDateTime.now())
				.build();
		addBet(bet);
		return bet;
	}

	private void addBet(Bet bet) {
		bets.add(bet);
		if (bets.size() > BET_LIST_SIZE) {
			bets.remove(0);
		}
	}

	@Getter
	@Builder
	public static class Bet {
		private Long id;
		private Long eventId;
		private Long betOfferId;
		private String username;
		private BigDecimal stake;
		private Integer odds;
		private StatusEnum status;
		private OffsetDateTime placed;

		public enum StatusEnum {
			PENDING, SETTLED, CANCELLED
		}
	}

	private int generateRandomInt() {
		return Math.abs(new Random().nextInt(100));
	}

	private Long generateRandomLong() {
		return Math.abs(new Random().nextLong());
	}
}
