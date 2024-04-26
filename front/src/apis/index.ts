import { AxiosResponse } from "axios";
import ResponseDto from "./response.dto";

// function: Request 처리 함수
export const requestHandler = <T>(response: AxiosResponse<T, any>) => {
    const responseBody = response.data;
    return responseBody;
}

// function: Request Error 처리 함수
export const requestErrorHandler = (error: any) => {
    // response가 있을때만 data를 찾도록하기 위해 ? 붙임
    const responseBody = error.response?.data;
    if (!responseBody) return null;
    return responseBody as ResponseDto;
};