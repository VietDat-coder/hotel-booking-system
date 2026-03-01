package com.example.hotelbooking.dto;

import lombok.Data;

import java.util.List;

@Data
public class HotelDto {
    private Long id;
    private String name;
    private String city;
    private String address;
    private String description;
    private Double rating;
    private String thumbnail;
    private List<RoomDto> rooms;
}

