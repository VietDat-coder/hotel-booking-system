package com.example.hotelbooking.mapper;

import com.example.hotelbooking.dto.RoomDto;
import com.example.hotelbooking.entity.Hotel;
import com.example.hotelbooking.entity.Room;
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
public class RoomMapperImpl implements RoomMapper {

    @Override
    public RoomDto toDto(Room room) {
        if ( room == null ) {
            return null;
        }

        RoomDto roomDto = new RoomDto();

        roomDto.setHotelId( roomHotelId( room ) );
        roomDto.setCapacity( room.getCapacity() );
        roomDto.setDescription( room.getDescription() );
        roomDto.setId( room.getId() );
        roomDto.setPrice( room.getPrice() );
        roomDto.setQuantity( room.getQuantity() );
        roomDto.setRoomType( room.getRoomType() );

        roomDto.setImageUrls( room.getImages() == null ? java.util.List.of() : room.getImages().stream().map(img -> img.getImageUrl()).toList() );

        return roomDto;
    }

    @Override
    public List<RoomDto> toDtoList(List<Room> rooms) {
        if ( rooms == null ) {
            return null;
        }

        List<RoomDto> list = new ArrayList<RoomDto>( rooms.size() );
        for ( Room room : rooms ) {
            list.add( toDto( room ) );
        }

        return list;
    }

    private Long roomHotelId(Room room) {
        if ( room == null ) {
            return null;
        }
        Hotel hotel = room.getHotel();
        if ( hotel == null ) {
            return null;
        }
        Long id = hotel.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
