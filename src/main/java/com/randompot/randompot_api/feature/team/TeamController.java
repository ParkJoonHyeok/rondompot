package com.randompot.randompot_api.feature.team;

import com.randompot.randompot_api.feature.team.dto.TeamSplitRequest;
import com.randompot.randompot_api.feature.team.dto.TeamSplitResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/team")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping("/split")
    public TeamSplitResponse split(@Valid @RequestBody TeamSplitRequest request) {
        return teamService.split(request);
    }
}
