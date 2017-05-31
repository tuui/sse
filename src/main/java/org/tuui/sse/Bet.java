package org.tuui.sse;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Random;

@Getter
@Builder
public class Bet {
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

    public static Bet generate() {
        return Bet.builder()
                .id(generateRandomLong())
                .eventId(generateRandomLong())
                .betOfferId(generateRandomLong())
                .username("user_" + generateRandomInt())
                .stake(new BigDecimal(generateRandomInt()))
                .odds(generateRandomInt() * 10 + 100)
                .status(Bet.StatusEnum.PENDING)
                .placed(OffsetDateTime.now())
                .build();
    }

    private static int generateRandomInt() {
        return Math.abs(new Random().nextInt(100));
    }

    private static Long generateRandomLong() {
        return Math.abs(new Random().nextLong() / 1000000000);
    }
}
