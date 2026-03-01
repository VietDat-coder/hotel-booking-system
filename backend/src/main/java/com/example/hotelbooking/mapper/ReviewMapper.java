package com.example.hotelbooking.mapper;

import com.example.hotelbooking.dto.ReviewDto;
import com.example.hotelbooking.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userName", source = "user.name")
    @Mapping(target = "hotelId", source = "hotel.id")
    ReviewDto toDto(Review review);

    List<ReviewDto> toDtoList(List<Review> reviews);
}

