package org.tuui.sse;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import reactor.core.publisher.EmitterProcessor;
import reactor.core.publisher.Flux;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Service
public class ScheduledService {

	private final EmitterProcessor<Bet> emitter;

	public ScheduledService() {
		emitter = EmitterProcessor.create();
	}

	public Flux<Bet> getMessages() {
		return emitter.log();
	}

	@Scheduled(fixedRate = 1000)
	void timerHandler() {
		try {
			emitter.onNext(
					Bet.builder()
							.id(1L)
							.betOfferId(123L)
							.username("john1")
							.stake(new BigDecimal(200))
							.odds(120)
							.status(Bet.StatusEnum.PENDING)
							.placed(OffsetDateTime.now())
							.build()
			);
		} catch (Exception e) {
			emitter.onError(e);
		}
	}
}
