package com.randompot.randompot_api.feature.mission;

import com.randompot.randompot_api.feature.mission.dto.MissionDrawRequest;
import com.randompot.randompot_api.feature.mission.dto.MissionDrawResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/mission")
public class MissionController {

    private final MissionService missionService;

    public MissionController(MissionService missionService) {
        this.missionService = missionService;
    }

    @PostMapping("/draw")
    public MissionDrawResponse draw(@Valid @RequestBody MissionDrawRequest request) {
        return missionService.draw(request);
    }
}
