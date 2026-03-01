package com.example.hotelbooking.mapper;

import com.example.hotelbooking.dto.ReviewDto;
import com.example.hotelbooking.entity.Hotel;
import com.example.hotelbooking.entity.Review;
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
public class ReviewMapperImpl implements ReviewMapper {

    @Override
    public ReviewDto toDto(Review review) {
        if ( review == null ) {
            return null;
        }

        ReviewDto reviewDto = new ReviewDto();

        reviewDto.setUserId( reviewUserId( review ) );
        reviewDto.setUserName( reviewUserName( review ) );
        reviewDto.setHotelId( reviewHotelId( review ) );
        reviewDto.setComment( review.getComment() );
        reviewDto.setCreatedAt( review.getCreatedAt() );
        reviewDto.setId( review.getId() );
        reviewDto.setRating( review.getRating() );

        return reviewDto;
    }

    @Override
    public List<ReviewDto> toDtoList(List<Review> reviews) {
        if ( reviews == null ) {
            return null;
        }

        List<ReviewDto> list = new ArrayList<ReviewDto>( reviews.size() );
        for ( Review review : reviews ) {
            list.add( toDto( review ) );
        }

        return list;
    }

    private Long reviewUserId(Review review) {
        if ( review == null ) {
            return null;
        }
        User user = review.getUser();
        if ( user == null ) {
            return null;
        }
        Long id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String reviewUserName(Review review) {
        if ( review == null ) {
            return null;
        }
        User user = review.getUser();
        if ( user == null ) {
            return null;
        }
        String name = user.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    private Long reviewHotelId(Review review) {
        if ( review == null ) {
            return null;
        }
        Hotel hotel = review.getHotel();
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
