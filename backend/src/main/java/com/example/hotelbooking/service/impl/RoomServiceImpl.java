package com.example.hotelbooking.service.impl;

import com.example.hotelbooking.dto.RoomDto;
import com.example.hotelbooking.entity.Hotel;
import com.example.hotelbooking.entity.Room;
import com.example.hotelbooking.exception.NotFoundException;
import com.example.hotelbooking.mapper.RoomMapper;
import com.example.hotelbooking.repository.HotelRepository;
import com.example.hotelbooking.repository.RoomRepository;
import com.example.hotelbooking.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;
    private final RoomMapper roomMapper;

    @Override
    @Transactional(readOnly = true)
    public List<RoomDto> getRoomsByHotel(Long hotelId) {
        List<Room> rooms = roomRepository.findByHotel_Id(hotelId);
        return roomMapper.toDtoList(rooms);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoomDto> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        return roomMapper.toDtoList(rooms);
    }

    @Override
    @Transactional(readOnly = true)
    public RoomDto getById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Room not found"));
        return roomMapper.toDto(room);
    }

    @Override
    @Transactional
    public RoomDto create(RoomDto dto) {
        Hotel hotel = hotelRepository.findById(dto.getHotelId())
                .orElseThrow(() -> new NotFoundException("Hotel not found"));
        Room room = new Room();
        room.setHotel(hotel);
        room.setRoomType(dto.getRoomType());
        room.setPrice(dto.getPrice());
        room.setCapacity(dto.getCapacity());
        room.setQuantity(dto.getQuantity());
        room.setDescription(dto.getDescription());
        Room saved = roomRepository.save(room);
        return roomMapper.toDto(saved);
    }

    @Override
    @Transactional
    public RoomDto update(Long id, RoomDto dto) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Room not found"));
        if (dto.getHotelId() != null && !dto.getHotelId().equals(room.getHotel().getId())) {
            Hotel hotel = hotelRepository.findById(dto.getHotelId())
                    .orElseThrow(() -> new NotFoundException("Hotel not found"));
            room.setHotel(hotel);
        }
        room.setRoomType(dto.getRoomType());
        room.setPrice(dto.getPrice());
        room.setCapacity(dto.getCapacity());
        room.setQuantity(dto.getQuantity());
        room.setDescription(dto.getDescription());
        Room saved = roomRepository.save(room);
        return roomMapper.toDto(saved);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!roomRepository.existsById(id)) {
            throw new NotFoundException("Room not found");
        }
        roomRepository.deleteById(id);
    }
}

