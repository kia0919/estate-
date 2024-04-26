import ResponseDto from "src/apis/response.dto";

//# description 로그인 Response Body Dto
export interface SignInResponseDto extends ResponseDto {
    acccessToken: string;
    //? 만료기간
    expires: number;
}