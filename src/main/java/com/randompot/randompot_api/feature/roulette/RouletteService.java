package com.randompot.randompot_api.feature.roulette;

import com.randompot.randompot_api.feature.common.FeatureItemUtils;
import com.randompot.randompot_api.feature.roulette.dto.RouletteSpinRequest;
import com.randompot.randompot_api.feature.roulette.dto.RouletteSpinResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RouletteService {

    public RouletteSpinResponse spin(RouletteSpinRequest request) {
        if (request == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "request must not be null");
        }

        List<String> normalizedItems = FeatureItemUtils.normalizeItems(request.items());

        if (normalizedItems.size() < 2) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "items must contain at least 2 values");
        }

        String selectedItem = FeatureItemUtils.pickRandomItem(normalizedItems);

        return new RouletteSpinResponse(
                request.title().trim(),
                selectedItem,
                normalizedItems.size()
        );
    }
}
