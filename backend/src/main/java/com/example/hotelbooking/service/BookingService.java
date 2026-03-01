package com.example.hotelbooking.service;

import com.example.hotelbooking.dto.BookingDto;
import com.example.hotelbooking.dto.BookingRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookingService {

    BookingDto createBooking(BookingRequest request);

    Page<BookingDto> getMyBookings(Pageable pageable);

    void cancelBooking(Long bookingId);

    // Admin
    Page<BookingDto> getAllBookings(Pageable pageable);
}

