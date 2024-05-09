package com.estate.back.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.estate.back.service.EstateService;

@RestController
@RequestMapping("/api/v1/estate")
public class EstateController {
   
    private final EstateService estateService;
}
