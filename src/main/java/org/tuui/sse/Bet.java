package org.tuui.sse;

import lombok.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Getter
@Setter
@Builder
public class Bet {
	private Long id;
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



