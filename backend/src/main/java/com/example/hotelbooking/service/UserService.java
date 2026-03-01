package com.example.hotelbooking.service;

import com.example.hotelbooking.dto.AuthRequest;
import com.example.hotelbooking.dto.AuthResponse;
import com.example.hotelbooking.dto.RegisterRequest;
import com.example.hotelbooking.dto.UserDto;

public interface UserService {

    UserDto register(RegisterRequest request);

    AuthResponse login(AuthRequest request);

    UserDto getCurrentUser();
}

