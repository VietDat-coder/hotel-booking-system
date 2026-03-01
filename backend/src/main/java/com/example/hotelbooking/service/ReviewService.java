package com.example.hotelbooking.service;

import com.example.hotelbooking.dto.CreateReviewRequest;
import com.example.hotelbooking.dto.ReviewDto;

import java.util.List;

public interface ReviewService {

    List<ReviewDto> getReviewsForHotel(Long hotelId);

    ReviewDto addReview(CreateReviewRequest request);
}

