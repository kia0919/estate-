package com.estate.back.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.estate.back.dto.response.ResponseDto;

// Request의 데이터 유효성 검사에서 발생하는 예외 처리
@RestControllerAdvice
public class ValidationExceptionHandler {
    
    // RequestBody의 데이터 유효성 검사 중 발생하는 예외 핸들링
    // - MethodArgumentNotValidException: 유효하지 않은 데이터
    // - HttpMessageNotReadableException: RequestBody가 없어서 유효성 검사를 하지 못할 때
    @ExceptionHandler({
        // 메소드인자에서 유효성이 맞지않으면 실행
        MethodArgumentNotValidException.class,
        HttpMessageNotReadableException.class
    })
    public ResponseEntity<ResponseDto> validationExceptionHandler(
        Exception exception
    ) {
        exception.printStackTrace();
        return ResponseDto.validationFailed();
    } 

}
