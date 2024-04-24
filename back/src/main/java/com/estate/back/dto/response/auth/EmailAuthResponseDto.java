package com.estate.back.dto.response.auth;

import com.estate.back.dto.response.ResponseCode;
import com.estate.back.dto.response.ResponseDto;
import com.estate.back.dto.response.ResponseMessage;

import lombok.Getter;

//# 이메일 인증 Response Body Dto
@Getter
public class EmailAuthResponseDto extends ResponseDto {

    private EmailAuthResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }
    
    
}
