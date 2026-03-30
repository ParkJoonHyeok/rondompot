package com.randompot.randompot_api.feature.mission.dto;

public record MissionDrawResponse(
        String title,
        String selectedItem,
        int totalItems
) {
}
