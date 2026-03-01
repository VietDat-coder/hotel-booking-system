package com.example.hotelbooking.service.impl;

import com.example.hotelbooking.dto.CreateReviewRequest;
import com.example.hotelbooking.dto.ReviewDto;
import com.example.hotelbooking.entity.Hotel;
import com.example.hotelbooking.entity.Review;
import com.example.hotelbooking.entity.User;
import com.example.hotelbooking.exception.BadRequestException;
import com.example.hotelbooking.exception.NotFoundException;
import com.example.hotelbooking.mapper.ReviewMapper;
import com.example.hotelbooking.repository.HotelRepository;
import com.example.hotelbooking.repository.ReviewRepository;
import com.example.hotelbooking.repository.UserRepository;
import com.example.hotelbooking.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final HotelRepository hotelRepository;
    private final UserRepository userRepository;
    private final ReviewMapper reviewMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ReviewDto> getReviewsForHotel(Long hotelId) {
        List<Review> reviews = reviewRepository.findByHotel_Id(hotelId);
        return reviewMapper.toDtoList(reviews);
    }

    @Override
    @Transactional
    public ReviewDto addReview(CreateReviewRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new BadRequestException("User not authenticated");
        }
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() -> new NotFoundException("Hotel not found"));

        Review review = new Review();
        review.setUser(user);
        review.setHotel(hotel);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review saved = reviewRepository.save(review);
        return reviewMapper.toDto(saved);
    }
}

