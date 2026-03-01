package com.example.hotelbooking.mapper;

import com.example.hotelbooking.dto.BookingDto;
import com.example.hotelbooking.dto.BookingItemDto;
import com.example.hotelbooking.entity.Booking;
import com.example.hotelbooking.entity.BookingDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookingMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "items", expression = "java(mapDetails(booking.getBookingDetails()))")
    BookingDto toDto(Booking booking);

    List<BookingDto> toDtoList(List<Booking> bookings);

    default List<BookingItemDto> mapDetails(List<BookingDetail> details) {
        if (details == null) {
            return java.util.List.of();
        }
        return details.stream().map(detail -> {
            BookingItemDto dto = new BookingItemDto();
            dto.setRoomId(detail.getRoom().getId());
            dto.setCheckIn(detail.getCheckIn());
            dto.setCheckOut(detail.getCheckOut());
            dto.setPrice(detail.getPrice());
            return dto;
        }).toList();
    }
}

