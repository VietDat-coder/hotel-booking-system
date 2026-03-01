package com.example.hotelbooking.repository;

import com.example.hotelbooking.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByHotel_Id(Long hotelId);
}

