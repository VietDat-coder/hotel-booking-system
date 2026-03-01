package com.example.hotelbooking.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingItemDto {
    private Long roomId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Double price;
}

