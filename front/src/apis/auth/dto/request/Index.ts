//# Request Dto 인터페이스 생성
//? - 해당 요청의 데이터에 속성 및 타입을 부여?? 구조 정의?

//# description: 로그인 Request Body DTO
export interface SignInRequestDto {
    // 로그인 요청의 userId는 문자열 타입의 속성?!
    userId: string;
    // 로그인 요청의 userPassword는 문자열 타입의 속성?!
    userPassword: string;
}

//# description: 아이디 중복 확인 Request Body DTO
export interface IdCheckRequestDto {
    // 아이디 중복 확인 요청의 userId는 무자열 타입?
    userId: string;
}

//# description: 이메일 인증 Request Body DTO
export interface EmailAuthRequestDto {
    userEmail: string;
}

//# description: 이메일 인증 확인 Request Body DTO
export interface EmailAuthCheckRequestDto {
    userEmail: string;
    authNumber: string;
}

//# description: 회원가입 Request Body DTO
export interface SignUpRequestDto {
    userId: string;
    userPassword: string;
    userEmail: string;
    authNumber: string;
}
