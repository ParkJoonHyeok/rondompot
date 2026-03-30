package com.randompot.randompot_api.feature.team.dto;

import java.util.List;

public record TeamSplitResponse(
        String title,
        int teamCount,
        List<TeamGroup> teams
) {
}
