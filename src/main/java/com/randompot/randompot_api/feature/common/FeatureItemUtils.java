package com.randompot.randompot_api.feature.common;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public final class FeatureItemUtils {

    private FeatureItemUtils() {
    }

    public static List<String> normalizeItems(List<String> items) {
        if (items == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "items must not be null");
        }

        List<String> normalizedItems = items.stream()
                .map(item -> item == null ? null : item.trim())
                .toList();

        boolean hasBlankItem = normalizedItems.stream().anyMatch(item -> item == null || item.isEmpty());
        if (hasBlankItem) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "items must not contain blank values");
        }

        return normalizedItems;
    }

    public static String pickRandomItem(List<String> items) {
        if (items == null || items.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "items must not be empty");
        }

        int selectedIndex = ThreadLocalRandom.current().nextInt(items.size());
        return items.get(selectedIndex);
    }
}
