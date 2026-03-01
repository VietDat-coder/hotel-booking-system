package com.example.hotelbooking.service.impl;

import com.example.hotelbooking.dto.HotelDto;
import com.example.hotelbooking.entity.Hotel;
import com.example.hotelbooking.entity.Room;
import com.example.hotelbooking.exception.NotFoundException;
import com.example.hotelbooking.mapper.HotelMapper;
import com.example.hotelbooking.repository.HotelRepository;
import com.example.hotelbooking.repository.RoomRepository;
import com.example.hotelbooking.service.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;
    private final HotelMapper hotelMapper;

    @Override
    @Transactional(readOnly = true)
    public Page<HotelDto> searchHotels(String city,
                                       Double minPrice,
                                       Double maxPrice,
                                       Double minRating,
                                       Pageable pageable) {

        Page<Hotel> page;
        if (city != null && !city.isBlank()) {
            page = hotelRepository.findByCityIgnoreCaseContaining(city, pageable);
        } else {
            page = hotelRepository.findAll(pageable);
        }

        List<Hotel> filtered = page.getContent().stream()
                .filter(hotel -> {
                    if (minRating != null) {
                        if (hotel.getRating() == null || hotel.getRating() < minRating) {
                            return false;
                        }
                    }
                    if (minPrice != null || maxPrice != null) {
                        java.util.List<Room> rooms = hotel.getRooms();
                        if (rooms == null || rooms.isEmpty()) {
                            return false;
                        }
                        for (Room room : rooms) {
                            double price = room.getPrice();
                            if (minPrice != null && price < minPrice) continue;
                            if (maxPrice != null && price > maxPrice) continue;
                            return true;
                        }
                        return false;
                    }
                    return true;
                }).toList();

        return page.map(hotel -> hotelMapper.toDto(
                filtered.stream()
                        .filter(h -> h.getId().equals(hotel.getId()))
                        .findFirst()
                        .orElse(hotel)
        ));
    }

    @Override
    @Transactional(readOnly = true)
    public HotelDto getById(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Hotel not found"));
        return hotelMapper.toDto(hotel);
    }

    @Override
    @Transactional
    public HotelDto create(HotelDto dto) {
        Hotel hotel = new Hotel();
        hotel.setName(dto.getName());
        hotel.setCity(dto.getCity());
        hotel.setAddress(dto.getAddress());
        hotel.setDescription(dto.getDescription());
        hotel.setRating(dto.getRating());
        hotel.setThumbnail(dto.getThumbnail());
        Hotel saved = hotelRepository.save(hotel);
        return hotelMapper.toDto(saved);
    }

    @Override
    @Transactional
    public HotelDto update(Long id, HotelDto dto) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Hotel not found"));
        hotel.setName(dto.getName());
        hotel.setCity(dto.getCity());
        hotel.setAddress(dto.getAddress());
        hotel.setDescription(dto.getDescription());
        hotel.setRating(dto.getRating());
        hotel.setThumbnail(dto.getThumbnail());
        Hotel saved = hotelRepository.save(hotel);
        return hotelMapper.toDto(saved);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!hotelRepository.existsById(id)) {
            throw new NotFoundException("Hotel not found");
        }
        hotelRepository.deleteById(id);
    }
}

