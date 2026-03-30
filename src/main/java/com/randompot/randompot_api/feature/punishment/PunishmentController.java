package com.randompot.randompot_api.feature.punishment;

import com.randompot.randompot_api.feature.punishment.dto.PunishmentDrawRequest;
import com.randompot.randompot_api.feature.punishment.dto.PunishmentDrawResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/punishment")
public class PunishmentController {

    private final PunishmentService punishmentService;

    public PunishmentController(PunishmentService punishmentService) {
        this.punishmentService = punishmentService;
    }

    @PostMapping("/draw")
    public PunishmentDrawResponse draw(@Valid @RequestBody PunishmentDrawRequest request) {
        return punishmentService.draw(request);
    }
}
