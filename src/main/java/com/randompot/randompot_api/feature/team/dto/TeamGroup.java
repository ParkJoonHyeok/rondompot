package com.randompot.randompot_api.feature.team.dto;

import java.util.List;

public record TeamGroup(
        String teamName,
        List<String> members
) {
}
