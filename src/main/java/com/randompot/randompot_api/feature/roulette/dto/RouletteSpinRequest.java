package com.randompot.randompot_api.feature.roulette.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record RouletteSpinRequest(
        @NotBlank(message = "title must not be blank")
        String title,
        @NotNull(message = "items must not be null")
        @Size(min = 2, message = "items must contain at least 2 values")
        List<@NotBlank(message = "items must not contain blank values") String> items
) {
}
