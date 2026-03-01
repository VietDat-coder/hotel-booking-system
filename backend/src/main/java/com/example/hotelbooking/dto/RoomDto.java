package com.example.hotelbooking.dto;

import lombok.Data;

import java.util.List;

@Data
public class RoomDto {
    private Long id;
    private Long hotelId;
    private String roomType;
    private Double price;
    private Integer capacity;
    private Integer quantity;
    private String description;
    private List<String> imageUrls;
}

