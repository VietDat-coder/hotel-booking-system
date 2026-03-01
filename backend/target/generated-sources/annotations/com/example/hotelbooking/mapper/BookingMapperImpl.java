package com.example.hotelbooking.mapper;

import com.example.hotelbooking.dto.BookingDto;
import com.example.hotelbooking.entity.Booking;
import com.example.hotelbooking.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-01T13:35:30+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class BookingMapperImpl implements BookingMapper {

    @Override
    public BookingDto toDto(Booking booking) {
        if ( booking == null ) {
            return null;
        }

        BookingDto bookingDto = new BookingDto();

        bookingDto.setUserId( bookingUserId( booking ) );
        bookingDto.setCreatedAt( booking.getCreatedAt() );
        bookingDto.setId( booking.getId() );
        bookingDto.setStatus( booking.getStatus() );
        bookingDto.setTotalPrice( booking.getTotalPrice() );

        bookingDto.setItems( mapDetails(booking.getBookingDetails()) );

        return bookingDto;
    }

    @Override
    public List<BookingDto> toDtoList(List<Booking> bookings) {
        if ( bookings == null ) {
            return null;
        }

        List<BookingDto> list = new ArrayList<BookingDto>( bookings.size() );
        for ( Booking booking : bookings ) {
            list.add( toDto( booking ) );
        }

        return list;
    }

    private Long bookingUserId(Booking booking) {
        if ( booking == null ) {
            return null;
        }
        User user = booking.getUser();
        if ( user == null ) {
            return null;
        }
        Long id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
