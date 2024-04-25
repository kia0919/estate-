package com.estate.back.service.implimentation;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.estate.back.dto.request.auth.EmailAuthCheckRequestDto;
import com.estate.back.dto.request.auth.EmailAuthRequestDto;
import com.estate.back.dto.request.auth.IdCheckRequestDto;
import com.estate.back.dto.request.auth.SignInRequestDto;
import com.estate.back.dto.request.auth.SignUpRequestDto;
import com.estate.back.dto.response.ResponseDto;
import com.estate.back.dto.response.auth.SignInResponseDto;
import com.estate.back.repository.UserRepository;
import com.estate.back.service.AuthService;

import lombok.RequiredArgsConstructor;

// Auth 모듈의 비즈니스 로직 구현체
@Service
@RequiredArgsConstructor
public class AuthServiceImplimentation implements AuthService {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<ResponseDto> idCheck(IdCheckRequestDto dto) {
        
        try {

            String userId = dto.getUserId();
            boolean existedUser = userRepository.existsByUserId(userId);
            if (existedUser) return ResponseDto.duplicatedId();

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();

    }

    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'signIn'");
    }

    @Override
    public ResponseEntity<ResponseDto> emailAuth(EmailAuthRequestDto dto) {
        
        try {

            String userEmail = dto.getUserEmail();
            boolean existedEmail = userRepository.existsByUserEmail(userEmail);
            if (existedEmail) return ResponseDto.duplicatedEmail();

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();

    }

    @Override
    public ResponseEntity<ResponseDto> emailAuthCheck(EmailAuthCheckRequestDto dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'emailAuthCheck'");
    }

    @Override
    public ResponseEntity<ResponseDto> signUp(SignUpRequestDto dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'signUp'");
    }
    
}