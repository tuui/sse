package org.tuui.sse;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SearchBetsResponse {
	private int collectionSize;
	List<Bet> bets;
}
