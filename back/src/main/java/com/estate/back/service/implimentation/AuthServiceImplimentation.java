package com.estate.back.service.implimentation;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.estate.back.common.util.EmailAuthNumberUtil;
import com.estate.back.dto.request.auth.EmailAuthCheckRequestDto;
import com.estate.back.dto.request.auth.EmailAuthRequestDto;
import com.estate.back.dto.request.auth.IdCheckRequestDto;
import com.estate.back.dto.request.auth.SignInRequestDto;
import com.estate.back.dto.request.auth.SignUpRequestDto;
import com.estate.back.dto.response.ResponseDto;
import com.estate.back.dto.response.auth.SignInResponseDto;
import com.estate.back.entity.EmailAuthNumberEntity;
import com.estate.back.entity.UserEntity;
import com.estate.back.provider.MailProvider;
import com.estate.back.repository.EmailAuthNumberRepository;
import com.estate.back.repository.UserRepository;
import com.estate.back.service.AuthService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

// Auth 모듈의 비즈니스 로직 구현체
@Service
@RequiredArgsConstructor
public class AuthServiceImplimentation implements AuthService {

    private final UserRepository userRepository;
    private final EmailAuthNumberRepository emailAuthNumberRepository;

    private final MailProvider mailProvider;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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

            String authNumber = EmailAuthNumberUtil.createNumber();

            EmailAuthNumberEntity emailAuthNumberEntity = new EmailAuthNumberEntity(userEmail, authNumber);
            emailAuthNumberRepository.save(emailAuthNumberEntity);

            mailProvider.mailAuthSend(userEmail, authNumber);

        } catch (MessagingException exception) {
            exception.printStackTrace();
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }


        return ResponseDto.success();

    }

    @Override
    public ResponseEntity<ResponseDto> emailAuthCheck(EmailAuthCheckRequestDto dto) {
        
        try {

            String userEmail = dto.getUserEmail();
            String authNumber = dto.getAuthNumber();

            boolean isMatched = emailAuthNumberRepository.existsByEmailAndAuthNumber(userEmail, authNumber);
            if(!isMatched) return ResponseDto.authenticationFailed();

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();

    }

    @Override
    public ResponseEntity<ResponseDto> signUp(SignUpRequestDto dto) {
    
        try {

            String userId = dto.getUserId();
            String userPassword = dto.getUserPassword();
            String userEmail = dto.getUserEmail();
            String AuthNumber = dto.getAuthNumber();

            //# 데이터베이스의 user 테이블에서 해당하는 userId를 가지고 있는 유저가 있는지 확인   
            boolean existedUser = userRepository.existsById(userId);
            if (existedUser) return ResponseDto.duplicatedId();
            //# 데이터베이스의 user 테이블에서 해당하는 userEmail를 가지고 있는 유저가 있는지 확인 
            boolean existedEmail = userRepository.existsByUserEmail(userEmail);
            if (existedEmail) return ResponseDto.duplicatedEmail();
            //# 데이터베이스의 email_auth_number 테이블에서 해당하는 userEmail과 authNumber를 모두 가지고 있는 데이터가 있는지 확인  
            boolean isMatched = emailAuthNumberRepository.existsByEmailAndAuthNumber(userEmail, AuthNumber);
            if(!isMatched) return ResponseDto.authenticationFailed();
            //# 사용자로부터 입력받은 userPassword를 암호화  
            String encodeedPassword = passwordEncoder.encode(userPassword);
            UserEntity userEntity = new UserEntity();

        }catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
  
    }
    
}