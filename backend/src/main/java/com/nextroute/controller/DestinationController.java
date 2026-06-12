package com.nextroute.controller;

import com.nextroute.model.Destination;
import com.nextroute.model.Destination.DestType;
import com.nextroute.repository.DestinationRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/api/destinations")
public class DestinationController {

    private final DestinationRepository destinationRepository;

    public DestinationController(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    @GetMapping("/must-visit")
    public ResponseEntity<List<Destination>> getMustVisit(HttpServletRequest request) {
        List<Destination> destinations = destinationRepository
                .findByTypeAndIsActiveTrue(DestType.MUST_VISIT);
        String currentBase = getCurrentBaseUrl();
        destinations.forEach(d -> resolveImageUrls(d, currentBase));
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/special-offers")
    public ResponseEntity<List<Destination>> getSpecialOffers(HttpServletRequest request) {
        List<Destination> destinations = destinationRepository
                .findByTypeAndIsActiveTrue(DestType.SPECIAL_OFFER);
        String currentBase = getCurrentBaseUrl();
        destinations.forEach(d -> resolveImageUrls(d, currentBase));
        return ResponseEntity.ok(destinations);
    }

    /**
     * Rewrites image URLs so they always point to the current server host.
     * Old URLs may contain stale Railway hostnames; this extracts just the
     * path portion (/nextroute/uploads/...) and rebuilds with the live base URL.
     */
    private void resolveImageUrls(Destination dest, String currentBase) {
        String urls = dest.getImageUrls();
        if (urls == null || urls.isBlank()) return;

        // For each URL in the JSON array, rewrite the host portion
        String resolved = urls.replaceAll(
            "https?://[^/]+(/nextroute/uploads/[^\"]+)",
            currentBase + "$1"
        );
        dest.setImageUrls(resolved);
    }

    private String getCurrentBaseUrl() {
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .replacePath("")
                .toUriString();
    }
}
