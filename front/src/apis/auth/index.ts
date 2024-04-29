import axios from 'axios';
import { EMAIL_AUTH_CHECK_REQUEST_URL, EMAIL_AUTH_REQUEST_URL, ID_CHECK_REQUEST_URL, SIGN_IN_REUQEST_URL, SIGN_UP_REQUEST_URL } from 'src/constant/Index';
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, IdCheckRequestDto, SignInRequestDto, SignUpRequestDto } from './dto/request/Index';
import { SignInResponseDto } from './dto/response';
import ResponseDto from '../response.dto';
import { requestErrorHandler, requestHandler } from '..';
//# 각 API 함수 생성

// function: 로그인 API 함수
//! SignInRequest(로그인 요청)함수
//! async: 비동기 함수 정의 / 매개변수 (resquestBody)이고 타입을 SignInRequestDto으로 지정
export const SignInRequest = async (requestBody: SignInRequestDto) => {
    //! axios.post: 서버에 post로 요청 / SIGN_IN_REQUEST_URL: 로그인 요청을 처리하는 URL / requestBody: 요청 본문 데이터
    const result = await axios.post(SIGN_IN_REUQEST_URL, requestBody)
        //! requestHandler함수 호출 제너릭타입SignInResponseDto지정
        .then(requestHandler<SignInResponseDto>)
        //! 요청 실패시 catch requestErrorHandler함수 호출하여 에러처리함
        .catch (requestErrorHandler);
    //! 결과 반환 
    return result;
};

// function: 아이디 중복 확인 API 함수
//! IdCheckRequest(아이디중복확인 요청)함수
//! ansync: 비동기 함수 정의 / 매개변수(requestBody)이고 해당 변수의 타입을 IdCheckRequestDto으로 지정
export const IdCheckRequest = async (requestBody: IdCheckRequestDto) => {
    //! awios.post: 서버에 post로 요청 / ID_CHECK_REQUEST_URL: 아이디중복체크하는 URL / requestBody: 요청 본문 데이터
    const result = await axios
        .post(ID_CHECK_REQUEST_URL, requestBody)
        //! requestHandler함수 호출 제너릭타입은 ResponseDto지정
        .then(requestHandler<ResponseDto>)
        //! 요청 실패시 requestErrorHandler함수 호출하여 에러처리함
        .catch(requestErrorHandler);
    //! 결과 반환
    return result;
};

// function: 이메일 인증 API 함수
//! EmailAuthRequest(이메일 인증 요청)함수
//! ansync: 비동기 함수 정의 / 매개변수(requestBody)이고 해당 변수의 타입을 EmailAuthRequestDto으로 지정
export const EmailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
    //! axios.post: 서버에 post요청 / EMAIL_AUTH_REQUEST_URL: 이메일인증하는 URL / requestBody: 요청 본문 데이터
    const result = await axios.post(EMAIL_AUTH_REQUEST_URL, requestBody)
        //! requestHandler함수 호출, 제너릭타입은 ResponseDto 지정
        .then(requestHandler<ResponseDto>)
        //! 요청 실패시 requestErrorHandler함수 호출하여 에러처리함
        .catch(requestErrorHandler);
    //! 결과 반환
    return result;
}

// function: 이메일 인증 확인 API 함수
//! EmailAuthCheckRequest(이메일 인증 확인 요청)함수
//! async: 비동기 함수 정의 / 매개변수(requestBody)이고 해당 변수의 타입을 EmailAuthCheckRequestDto으로 지정
export const EmailAuthCheckRequest = async (requestBody: EmailAuthCheckRequestDto) => {
    //! axios.post: 서버 post요청 / EMAIL_AUTH_CHECK_REQUEST_URL: 이메일 인증 확인하는 URL /requestBody: 요청 본문 데이터
    const result = await axios.post(EMAIL_AUTH_CHECK_REQUEST_URL, requestBody)
        //! requestHandler함수  호출, 제너릭타입은 ResponseDto 지정
        .then(requestHandler<ResponseDto>)
        //! 요청 실패시 requestErrorHandler함수 호출하여 에러처리함
        .catch(requestErrorHandler);
    //! 결과 반환
    return result;
}

// function: 회원가입 API 함수
//! SignUpRequest(회원가입 요청)함수
//! async: 비도기 함수 정의 / 매개변수 (requestBody)이고 해당 매개변수의 타입을 SignUpRequestDto타입 지정
export const SignUpRequest = async (requestBody: SignUpRequestDto) => {
    //! axios.post: 서버 post요청 / SIGN_UP_REQUEST_URL: 회원가입 요청URL / requestBody: 요청 본문 데이터
    const result = await axios.post(SIGN_UP_REQUEST_URL, requestBody)
        //! requestHandler함수 호출, 제너릭타입은 ResponseDto 지정
        .then(requestHandler<ResponseDto>)
        //! 요청 실패시 requestErrorHandler함수 호출하여 에러처리함
        .catch(requestErrorHandler);
    //! 결과 반환
    return result;
}