package com.randompot.randompot_api.feature.roulette;

import com.randompot.randompot_api.feature.roulette.dto.RouletteSpinRequest;
import com.randompot.randompot_api.feature.roulette.dto.RouletteSpinResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/roulette")
public class RouletteController {

    private final RouletteService rouletteService;

    public RouletteController(RouletteService rouletteService) {
        this.rouletteService = rouletteService;
    }

    @PostMapping("/spin")
    public RouletteSpinResponse spin(@Valid @RequestBody RouletteSpinRequest request) {
        return rouletteService.spin(request);
    }
}
