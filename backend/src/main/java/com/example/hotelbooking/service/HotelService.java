package com.example.hotelbooking.service;

import com.example.hotelbooking.dto.HotelDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HotelService {

    Page<HotelDto> searchHotels(String city,
                                Double minPrice,
                                Double maxPrice,
                                Double minRating,
                                Pageable pageable);

    HotelDto getById(Long id);

    // Admin
    HotelDto create(HotelDto dto);

    HotelDto update(Long id, HotelDto dto);

    void delete(Long id);
}

