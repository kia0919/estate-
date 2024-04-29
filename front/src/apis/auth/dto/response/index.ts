import ResponseDto from "src/apis/response.dto";

//# ResponseDto 인터페이스 생성

//# description 로그인 Response Body Dto
//! SignInResponseDto(로그인응답Dto)형태로 인테페이스 정의하고, ResponseDto를 상속 받는다
export interface SignInResponseDto extends ResponseDto {
    //! accessToken, expires 속성 정의
    accessToken: string;
    //? 만료기간
    expires: number;
}