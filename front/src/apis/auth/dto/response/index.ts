import ResponseDto from "src/apis/response.dto";

//# ResponseDto 인터페이스 생성

//# description 로그인 Response Body Dto
export interface SignInResponseDto extends ResponseDto {
    acccessToken: string;
    //? 만료기간
    expires: number;
}