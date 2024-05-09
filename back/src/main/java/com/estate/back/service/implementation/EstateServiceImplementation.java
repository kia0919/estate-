package com.estate.back.service.implementation;

import org.springframework.stereotype.Service;

import com.estate.back.repository.EstateRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EstateServiceImplementation implements EstateService {

    private final EstateRepository estateRepository;

}
