package com.example.hotelbooking.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewDto {
    private Long id;
    private Long userId;
    private String userName;
    private Long hotelId;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
}

