package org.tuui.sse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchBetsRequest {
    private int pageNr;
    private int pageSize;
}
