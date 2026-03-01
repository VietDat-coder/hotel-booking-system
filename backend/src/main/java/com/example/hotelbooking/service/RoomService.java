package com.example.hotelbooking.service;

import com.example.hotelbooking.dto.RoomDto;

import java.util.List;

public interface RoomService {

    List<RoomDto> getRoomsByHotel(Long hotelId);

    List<RoomDto> getAllRooms();

    RoomDto getById(Long id);

    // Admin
    RoomDto create(RoomDto dto);

    RoomDto update(Long id, RoomDto dto);

    void delete(Long id);
}

