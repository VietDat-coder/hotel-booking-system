package com.example.hotelbooking.mapper;

import com.example.hotelbooking.dto.RoomDto;
import com.example.hotelbooking.entity.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoomMapper {

    @Mapping(target = "hotelId", source = "hotel.id")
    @Mapping(target = "imageUrls", expression = "java(room.getImages() == null ? java.util.List.of() : room.getImages().stream().map(img -> img.getImageUrl()).toList())")
    RoomDto toDto(Room room);

    List<RoomDto> toDtoList(List<Room> rooms);
}

