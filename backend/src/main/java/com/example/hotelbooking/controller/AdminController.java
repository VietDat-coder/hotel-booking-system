package com.example.hotelbooking.controller;

import com.example.hotelbooking.dto.BookingDto;
import com.example.hotelbooking.dto.HotelDto;
import com.example.hotelbooking.dto.RoomDto;
import com.example.hotelbooking.dto.UserDto;
import com.example.hotelbooking.entity.UserRole;
import com.example.hotelbooking.exception.NotFoundException;
import com.example.hotelbooking.repository.UserRepository;
import com.example.hotelbooking.service.BookingService;
import com.example.hotelbooking.service.HotelService;
import com.example.hotelbooking.service.RoomService;
import com.example.hotelbooking.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final HotelService hotelService;
    private final RoomService roomService;
    private final BookingService bookingService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    // Hotels CRUD
    @PostMapping("/hotels")
    public ResponseEntity<HotelDto> createHotel(@RequestBody HotelDto dto) {
        return ResponseEntity.ok(hotelService.create(dto));
    }

    @PutMapping("/hotels/{id}")
    public ResponseEntity<HotelDto> updateHotel(@PathVariable Long id, @RequestBody HotelDto dto) {
        return ResponseEntity.ok(hotelService.update(id, dto));
    }

    @DeleteMapping("/hotels/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        hotelService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Rooms CRUD
    @PostMapping("/rooms")
    public ResponseEntity<RoomDto> createRoom(@RequestBody RoomDto dto) {
        return ResponseEntity.ok(roomService.create(dto));
    }

    @PutMapping("/rooms/{id}")
    public ResponseEntity<RoomDto> updateRoom(@PathVariable Long id, @RequestBody RoomDto dto) {
        return ResponseEntity.ok(roomService.update(id, dto));
    }

    @DeleteMapping("/rooms/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Users management (simple)
    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> listUsers() {
        return ResponseEntity.ok(userRepository.findAll().stream().map(userMapper::toDto).toList());
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<UserDto> updateUserRole(@PathVariable Long id, @RequestParam UserRole role) {
        var user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
        user.setRole(role);
        var saved = userRepository.save(user);
        return ResponseEntity.ok(userMapper.toDto(saved));
    }

    // Bookings listing
    @GetMapping("/bookings")
    public ResponseEntity<Page<BookingDto>> listBookings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(bookingService.getAllBookings(pageable));
    }

    // Simple dashboard stats
    @GetMapping("/dashboard/summary")
    public ResponseEntity<DashboardSummary> summary() {
        long userCount = userRepository.count();
        long bookingCount = bookingService.getAllBookings(PageRequest.of(0, Integer.MAX_VALUE)).getTotalElements();
        double totalRevenue = bookingService.getAllBookings(PageRequest.of(0, Integer.MAX_VALUE))
                .stream()
                .mapToDouble(BookingDto::getTotalPrice)
                .sum();

        DashboardSummary summary = new DashboardSummary();
        summary.setTotalUsers(userCount);
        summary.setTotalBookings(bookingCount);
        summary.setTotalRevenue(totalRevenue);
        return ResponseEntity.ok(summary);
    }

    public static class DashboardSummary {
        private long totalUsers;
        private long totalBookings;
        private double totalRevenue;

        public long getTotalUsers() {
            return totalUsers;
        }

        public void setTotalUsers(long totalUsers) {
            this.totalUsers = totalUsers;
        }

        public long getTotalBookings() {
            return totalBookings;
        }

        public void setTotalBookings(long totalBookings) {
            this.totalBookings = totalBookings;
        }

        public double getTotalRevenue() {
            return totalRevenue;
        }

        public void setTotalRevenue(double totalRevenue) {
            this.totalRevenue = totalRevenue;
        }
    }
}

