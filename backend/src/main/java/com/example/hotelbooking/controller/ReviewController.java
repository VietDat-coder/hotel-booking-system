package com.example.hotelbooking.controller;

import com.example.hotelbooking.dto.CreateReviewRequest;
import com.example.hotelbooking.dto.ReviewDto;
import com.example.hotelbooking.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<ReviewDto>> getByHotel(@RequestParam Long hotelId) {
        return ResponseEntity.ok(reviewService.getReviewsForHotel(hotelId));
    }

    @PostMapping
    public ResponseEntity<ReviewDto> add(@Valid @RequestBody CreateReviewRequest request) {
        return ResponseEntity.ok(reviewService.addReview(request));
    }
}

