package com.randompot.randompot_api.feature.roulette.dto;

public record RouletteSpinResponse(
        String title,
        String selectedItem,
        int totalItems
) {
}
