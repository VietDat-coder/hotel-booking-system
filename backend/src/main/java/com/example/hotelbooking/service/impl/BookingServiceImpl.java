package com.example.hotelbooking.service.impl;

import com.example.hotelbooking.dto.BookingDto;
import com.example.hotelbooking.dto.BookingItemDto;
import com.example.hotelbooking.dto.BookingRequest;
import com.example.hotelbooking.entity.*;
import com.example.hotelbooking.exception.BadRequestException;
import com.example.hotelbooking.exception.NotFoundException;
import com.example.hotelbooking.mapper.BookingMapper;
import com.example.hotelbooking.repository.BookingRepository;
import com.example.hotelbooking.repository.RoomRepository;
import com.example.hotelbooking.repository.UserRepository;
import com.example.hotelbooking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final BookingMapper bookingMapper;

    @Override
    @Transactional
    public BookingDto createBooking(BookingRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new BadRequestException("User not authenticated");
        }
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new BadRequestException("Booking items are required");
        }

        Booking booking = new Booking();
        booking.setUser(user);

        List<BookingDetail> details = new ArrayList<>();
        double totalPrice = 0.0;

        for (BookingItemDto item : request.getItems()) {
            Room room = roomRepository.findById(item.getRoomId())
                    .orElseThrow(() -> new NotFoundException("Room not found: " + item.getRoomId()));
            long nights = ChronoUnit.DAYS.between(item.getCheckIn(), item.getCheckOut());
            if (nights <= 0) {
                throw new BadRequestException("Check-out must be after check-in");
            }
            double price = room.getPrice() * nights;

            BookingDetail detail = new BookingDetail();
            detail.setBooking(booking);
            detail.setRoom(room);
            detail.setCheckIn(item.getCheckIn());
            detail.setCheckOut(item.getCheckOut());
            detail.setPrice(price);
            details.add(detail);

            totalPrice += price;
        }

        booking.setTotalPrice(totalPrice);
        booking.setBookingDetails(details);

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setMethod(request.getPaymentMethod());
        payment.setStatus("PAID"); // mock payment success
        payment.setTransactionCode("TX-" + System.currentTimeMillis());
        booking.setPayment(payment);

        Booking saved = bookingRepository.save(booking);
        return bookingMapper.toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BookingDto> getMyBookings(Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new BadRequestException("User not authenticated");
        }
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Page<Booking> page = bookingRepository.findByUser_Id(user.getId(), pageable);
        return page.map(bookingMapper::toDto);
    }

    @Override
    @Transactional
    public void cancelBooking(Long bookingId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new BadRequestException("User not authenticated");
        }
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Booking not found"));

        if (!booking.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Cannot cancel booking of another user");
        }
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BookingDto> getAllBookings(Pageable pageable) {
        Page<Booking> page = bookingRepository.findAll(pageable);
        return page.map(bookingMapper::toDto);
    }
}

