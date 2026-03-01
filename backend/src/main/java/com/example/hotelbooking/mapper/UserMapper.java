package com.example.hotelbooking.mapper;

import com.example.hotelbooking.dto.RegisterRequest;
import com.example.hotelbooking.dto.UserDto;
import com.example.hotelbooking.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toDto(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "role", ignore = true)
    User fromRegisterRequest(RegisterRequest request);
}

