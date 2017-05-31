package org.tuui.sse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class BetService {

    private final static int BET_LIST_SIZE = 111;
    private static List<Bet> BETS = new ArrayList<>();

    static {
        for (int i = 0; i < BET_LIST_SIZE; i++) {
            BETS.add(Bet.generate());
        }
    }

    SearchBetsResponse searchBets(SearchBetsRequest request) {
        SearchBetsResponse response = new SearchBetsResponse();
        response.setCollectionSize(BETS.size());
        int fromIndex = (request.getPageNr() - 1) * request.getPageSize();
        int toIndex = fromIndex + request.getPageSize();
        if (toIndex > BETS.size()) {
            toIndex = BETS.size();
        }
        response.setBets(BETS.subList(fromIndex, toIndex));
        log.debug("fromIndex = {}, toIndex = {}, bets.size() = {}", fromIndex, toIndex, response.getBets().size());

        return response;
    }
}
