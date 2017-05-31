package org.tuui.sse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.util.function.Tuple2;

import java.time.Duration;
import java.util.stream.Stream;

@RequestMapping("api")
@RestController
public class BetController {

    @Autowired
    private BetService betService;

    @PostMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public SearchBetsResponse searchBets(@RequestBody SearchBetsRequest request) {
        return betService.searchBets(request);
    }

    @GetMapping(value = "/live", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Bet> live() {
        Flux<Bet> betFlux = Flux.fromStream(Stream.generate(Bet::generate));
        Flux<Long> durationFlux = Flux.interval(Duration.ofSeconds(1));
        return Flux.zip(betFlux, durationFlux).map(Tuple2::getT1);
    }
}
