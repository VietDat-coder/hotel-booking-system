package com.example.hotelbooking.mapper;

import com.example.hotelbooking.dto.HotelDto;
import com.example.hotelbooking.entity.Hotel;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-01T13:35:30+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class HotelMapperImpl implements HotelMapper {

    @Autowired
    private RoomMapper roomMapper;

    @Override
    public HotelDto toDto(Hotel hotel) {
        if ( hotel == null ) {
            return null;
        }

        HotelDto hotelDto = new HotelDto();

        hotelDto.setRooms( roomMapper.toDtoList( hotel.getRooms() ) );
        hotelDto.setAddress( hotel.getAddress() );
        hotelDto.setCity( hotel.getCity() );
        hotelDto.setDescription( hotel.getDescription() );
        hotelDto.setId( hotel.getId() );
        hotelDto.setName( hotel.getName() );
        hotelDto.setRating( hotel.getRating() );
        hotelDto.setThumbnail( hotel.getThumbnail() );

        return hotelDto;
    }

    @Override
    public List<HotelDto> toDtoList(List<Hotel> hotels) {
        if ( hotels == null ) {
            return null;
        }

        List<HotelDto> list = new ArrayList<HotelDto>( hotels.size() );
        for ( Hotel hotel : hotels ) {
            list.add( toDto( hotel ) );
        }

        return list;
    }
}
