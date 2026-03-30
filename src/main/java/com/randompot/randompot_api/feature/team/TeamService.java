package com.randompot.randompot_api.feature.team;

import com.randompot.randompot_api.feature.common.FeatureItemUtils;
import com.randompot.randompot_api.feature.team.dto.TeamGroup;
import com.randompot.randompot_api.feature.team.dto.TeamSplitRequest;
import com.randompot.randompot_api.feature.team.dto.TeamSplitResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class TeamService {

    public TeamSplitResponse split(TeamSplitRequest request) {
        if (request == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "request must not be null");
        }

        List<String> normalizedItems = FeatureItemUtils.normalizeItems(request.items());

        if (normalizedItems.size() < 2) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "items must contain at least 2 values");
        }

        if (request.teamCount() < 2) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "teamCount must be at least 2");
        }

        if (request.teamCount() > normalizedItems.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "teamCount must not exceed number of items");
        }

        List<String> shuffled = new ArrayList<>(normalizedItems);
        Collections.shuffle(shuffled, ThreadLocalRandom.current());

        List<List<String>> buckets = new ArrayList<>();
        for (int i = 0; i < request.teamCount(); i++) {
            buckets.add(new ArrayList<>());
        }

        for (int i = 0; i < shuffled.size(); i++) {
            buckets.get(i % request.teamCount()).add(shuffled.get(i));
        }

        List<TeamGroup> teams = new ArrayList<>();
        for (int i = 0; i < buckets.size(); i++) {
            teams.add(new TeamGroup((i + 1) + "팀", buckets.get(i)));
        }

        return new TeamSplitResponse(request.title().trim(), request.teamCount(), teams);
    }
}
