package com.randompot.randompot_api.feature.punishment.dto;

public record PunishmentDrawResponse(
        String title,
        String selectedItem,
        int totalItems
) {
}
