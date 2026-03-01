package com.example.hotelbooking.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class BookingRequest {

    @NotEmpty
    private List<BookingItemDto> items;

    @NotNull
    private String paymentMethod;
}

