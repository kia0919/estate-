import { AxiosResponse } from 'axios';
import ResponseDto from './response.dto';

// function: Request 처리 함수 
//? requestHander: Axios 응답 처리
//? <T> 함수가 반환할 데이터 타입, response: AxiosResponse<T, any>: T:응답 데이터 객체 / T의 타입을 any로 지정
export const requestHandler = <T>(response: AxiosResponse<T, any>) => {
    //? response.data: AxiosResponse의 data속성을 responseBody에 할당
    const responseBody = response.data;
    // responseBody 반환
    return responseBody;
};

// function: Request Error 처리 함수 
//! requestErrorHandler: Axios에 발생하는 Error처리하는 함수
//! 매개변수 error 타입을 any로 지정
export const requestErrorHandler = (error: any) => {
    //! 오류객체의 response속성이 존재하는 경우 해당 속성의 data를 가져옴
    const responseBody = error.response?.data;
    //! responseBody에 오류가 없으면 null을 반환
    if (!responseBody) return null;
    //! rsponseBody를 ResponseDto타입으로 형변환하여 반환
    return responseBody as ResponseDto;
};

// function: Authorization Bearer 헤더 
export const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } });