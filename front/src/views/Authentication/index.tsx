import React, { ChangeEvent, useState } from "react";
import "./style.css";

import SignInBackground from 'src/assets/image/sign-in-background.png';
import SignUpBackground from 'src/assets/image/sign-up-background.png';
import InputBox from "src/components/Inputbox";
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, IdCheckRequestDto, SignInRequestDto, SignUpRequestDto } from "src/apis/auth/dto/request/Index";
import { EmailAuthCheckRequest, EmailAuthRequest, IdCheckRequest, SignInRequest, SignUpRequest } from "src/apis/auth";
import ResponseDto from "src/apis/response.dto";
import { SignInResponseDto } from "src/apis/auth/dto/response";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { LOCAL_ABSOLUTE_PATH } from "src/constant/Index";

//                    type                    //
// 페이지 타입을 로그인, 회원가입을 두 페이지를 나타냄.
type AuthPage = 'sign-in' | 'sign-up';

//                    interface                    //
// SnsContainerProps인터페이스에 전달되는 속성이 title: string
interface SnsContainerProps {
    title: string;
}   

//                    component                    //
// 소셜 로그인 버튼을 클릭했을 때의 기능 구현,
// 인터페이스의 title 속성을 가지고 옴.
function SnsContainer({ title }: SnsContainerProps) {

    //                    event handler                    //
    // onSnsButtonClickHandler함수 정의에서 type매개변수를 받고, kakao, naver 두가지 문자열 값 중 하나를 가져야하고,
    const onSnsButtonClickHandler = (type: 'kakao' | 'naver') => {
        // 클릭시 선택한 버튼 타입이 무엇인지 alert로 알려준다.
        alert(type);
    };

    //                    render                    //
    // SnsContainer컴포넌트가 화면에 어케표시되는지 정의(렌더링),
    return (
    // return반환으로, authentication-sns-container 클래스를 가진 컨테이너
        <div className="authentication-sns-container">
            {/* sns-container-title label 클래스에서 {title} 인터페이스 props에서 전달된 문자열 */}
            <div className="sns-container-title label">{title}</div>
            {/* 소셜 버튼 컨테이너 */}
            <div className="sns-button-container">
                {/* kakao 버튼을 클릭하면, onSnsButtonClickHandler함수를 호출하여 'kakao'가 전달됨, 람다 함수 사용  */}
                <div className="sns-button kakao-button" onClick={() => onSnsButtonClickHandler('kakao')}></div>
                {/* naver 버튼을 클릭하면, onSnsButtonClickHandler함수를 호출하여 'naver'가 전달됨, 람다 함수 사용 */}
                <div className="sns-button naver-button" onClick={() => onSnsButtonClickHandler('naver')}></div>
            </div>
        </div>
    );
}

//                    interface                    //
// Props에 전달되는 속성을 onLinkClickHandler함수로 받고,
// 매개변수를 받지 않음, void로 아무것도 반환하지 않는다
interface Props {
    onLinkClickHandler: () => void
}

//                    component                    //
// 부모 컴포넌트로부터 Props의 onLinkClickHandler함수를 받아온다.
function SignIn({ onLinkClickHandler }: Props) {

    //                    state                    //
    // 패키지 cookie 사용
    const [cookies, setCookie]= useCookies();

    // 상태함수(id), 상태변경함수(setId)를 useState사용하여 타입과, 초기값을 설정(useState로 상태 설정)
    const [id, setId] = useState<string>('');

    // 상태함수(password), 상태변경함수(setPassword)를 useState사용하여 타입과, 초기값을 설정
    const [password, setPassword] = useState<string>('');

    const [message, setMessage] = useState<string>('');


    //                    function                    //
    const navigator = useNavigate();

    const signInResponse = (result: SignInResponseDto | ResponseDto | null) => {
        
        const message = 
            !result ? '서버에 문제가 있습니다.':
            result.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.':
            result.code === 'SF' ? '로그인 정보가 일치하지 않습니다.':
            result.code === 'TF' ? '서버에 문제가 있습니다.':
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        setMessage(message);

        const isSuccess = result && result.code === 'SU';
        if (!isSuccess) return;

        // ResponseDto에는 token,expires가 없으므로 에러가 뜸 / SignInResponseDto 강제로 가져와서 해결
        const { acccessToken, expires } = result as SignInResponseDto;
        // Date.now(milliseconds단위): 현재시간
        // expire: 만료시간 / 현재 단위가  milliseconds이므로 second로 단위변환하기 위해 현재 만료시간에 + 1000을 한다.
        const expiration = new Date(Date.now() + (expires + 1000))
        // accessTokem이란 이름으로 값(acccessToken)에 넣어주겠다
        setCookie('accessToken', acccessToken, {path: '/', expires:expiration});
        
        // 절대경로 지정, 페이지 이동
        navigator(LOCAL_ABSOLUTE_PATH);

    };

    //                    event handler                    //
    // onIdChangeHandler함수: Id입력란을 변경 처리하고 입력란에 입력된 값을 id상태에 설정
    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        // id입력값이 변경할 때마다 해당 값을 상태로 리렌더링 한다.
        setId(event.target.value);
        setMessage('');

    };

    // onPasswordChangeHandler함수: 비밀번호 입력란을 변경 처리, 비밀번호 입력란에 입력된 값을 비밀번호 상태에 설정
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        // setPassword는 상태변경함수 이므로, 비밀번호 입력란이 변경될 때마다 해당 값을 상태로 리렌더링 한다.
        setPassword(event.target.value);
        setMessage('');
    };

    const onSignInButtonClickHandler = () => {
        // id나 password 입력란이 비어있으면
        if (!id || !password) {
            setMessage('아이디와 비밀번호를 모두 입력하세요.');
            return;        
        }

        const requestBody: SignInRequestDto = {
            userId: id,
            userPassword: password
        }
        // SignInRequest요청을 보낸다음에 then작업을 실행하여 signInResponse응답을 반환하게 한다.
        SignInRequest(requestBody).then(signInResponse);
        
    };

    //                    render                    //
    // 랜더링 하는 반환 값
    return (
        <div className="authentication-contents">
            {/* 아이디, 비밀번호 입력란 컨테이너 */}
            <div className="authentication-input-container">
                {/*  */}
                <InputBox label="아이디" type="text" value={id} placeholder="아이디를 입력해주세요" onChangeHandler={onIdChangeHandler} />
                <InputBox label="비밀번호" type="password" value={password} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordChangeHandler} message={message} error />
            </div>
            {/* 로그인 버튼, 회원가입 링크 */}
            <div className="authentication-button-container">
                {/* 로그인 버튼 클릭 시 onSignInButtonClickHandler함수 호출 */}
                <div className="primary-button full-width" onClick={onSignInButtonClickHandler}>로그인</div>
                {/* 회원가입 링크 버튼 클릭 시 onLinkClickHandler함수 호출 */}
                <div className="text-link" onClick={onLinkClickHandler}>회원가입</div>
            </div>
            {/* SNS  로그인 */}
            <div className="short-divider"></div>
            <SnsContainer title="SNS 로그인" />
        </div>
    );
}

//                    component                    //
// 회원가입 랜더링 컴포넌트
function SignUp({ onLinkClickHandler }: Props) {

    //                    state                    //
    // 상태 관리
    // 사용자가(Id, password, passwordCheck, email, authnumber) 입력후 회원가입 버튼을 누르면 ('')으로 인해 초기화 됨
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<string>('');

    // useState<boolean>(false): 상태 변수를 생성하고, 초기 값으로 false를 전달하여 초기 버튼이 비활성화,
    // idButtonStatus: 현재 버튼의 활성화 상태, setIdButtonStatus: 버튼 활성화 상태가 변경시 저장됨.
    const [idButtonStatus, setIdButtonStatus] = useState<boolean>(false);
    const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
    const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);

    // 각 Id, Email, AuthNumber입력란에 유효성에 맞게 했는지 여부 확인,
    // 초기값이 모두 false이므로 초기 상태는 유효성임 맞지 않음
    const [isIdCheck, setIdCheck] = useState<boolean>(false);
    const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);
    const [isEqualPassword, setEqualPassword] = useState<boolean>(false);
    const [isEmailCheck, setEmailCheck] = useState<boolean>(false);
    const [isAuthNumberCheck, setAuthNumberCheck] = useState<boolean>(false);

    // 유효성 검사 결과 메시지를 화면에 표시
    const [idMessage, setIdMessage] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');

    // Id, Email, AythNumber입력란에 사용자가 입력한 텍스트에 오류가 있는지 검사
    const [isIdError, setIdError] = useState<boolean>(false);
    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [isAuthNumberError, setAuthNumberError] = useState<boolean>(false);

    // AND연산자로 id, email, authNumber, password, passwordCheck가 모두 유효성이 true여야 회원가입 버튼이 활성화 된다.
    const isSignUpActive = isIdCheck && isEmailCheck && isAuthNumberCheck && isPasswordPattern && isEqualPassword;
    // isSignUpActive 값이 true이면 'primary'-button full-width` 지정되어 회원가입 버튼이 활성화,
    // 값이 false이면 'disable'-button full-width`으로 지정되어 회원가입 버튼 비활성화(사용자가 필수 정보 입력하지 않았거나, 조건 미충족시)
    const signUpButtonClass = `${isSignUpActive ? 'primary' : 'disable'}-button full-width`;

    // function //
    const idCheckResponse = (result: ResponseDto | null) => {

        const idMessage = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '아이디는 빈 값 혹은 공백으로만 이루어질 수 없습니다.' :
            result.code === 'DI' ?  '이미 사용중인 아이디입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' :
            result.code === 'SU' ? '사용 가능한 아이디입니다.' : '';
        const idError = !(result && result.code === 'SU');
        const idCheck = !idError;

        setIdMessage(idMessage);
        setIdError(idError);
        setIdCheck(idCheck);

    };


    const emailAuthResponse = (result: ResponseDto | null) => {

        const emailMessage = 
            !result ? '서버에 문제가 있습니다.' : 
            result.code === 'VF' ? '이메일 형식이 아닙니다.' :
            result.code === 'DE' ? '중복된 이메일입니다.' :
            result.code === 'MF' ? '인증번호 전송에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : 
            result.code === 'SU' ? '인증번호가 전송되었습니다.' : '';
        const emailCheck = result !== null && result.code === 'SU';
        const emailError = !emailCheck;

        setEmailMessage(emailMessage);
        setEmailCheck(emailCheck);
        setEmailError(emailError);

    };

    const emailAuthCheckResponse = (result: ResponseDto | null) => {

        const authNumberMessage =
            //! 결과가 존재하지 않는다면 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '인증번호를 입력해주세요.':
            result.code === 'AF' ? '인증번호가 일치하지 않습니다.':
            result.code === 'DBE' ? '서버에 문제가 있습니다.':
            result.code === 'SU' ? '인증번호가 확인되었습니다.' : '';
        const authNumberCheck = result !== null && result.code === 'SU';
        const authNumberError = !authNumberCheck;
        
        setAuthNumberMessage(authNumberMessage);
        setAuthNumberCheck(authNumberCheck);
        setAuthNumberError(authNumberError);

    };

    const signUpResponse = (result: ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '입력 형식이 맞지 않습니다.' : 
            result.code === 'DI' ? '이미 사용중인 아이디입니다.' :
            result.code === 'DE' ? '중복된 이메일입니다.' :
            result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

        const isSuccess = result && result.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }
        onLinkClickHandler();
        
    };




    //                    event handler                    //
    // Id입력란이 변경될때 onIdChangeHandler함수 호출
    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setId(value);
        // 입력란이 비어있는지
        setIdButtonStatus(value !== '');
        // Id유효성 재검사
        setIdCheck(false);
        // Id입력란에 표시되는 메시지 초기화
        setIdMessage('');
    };

    // 비밀번호 입력란 변경시 onPasswordChangeHandler함수 호출
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        // 입력한 비밀번호 값 가져 옴
        const { value } = event.target;
        // setPassword은 상태변경함수로 패스워드 값이 변경될때마다 업데이트함
        setPassword(value);

        // 비밀번호 정규식 설정
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
        // 정규식과 입력된 문자열이 일치하는지 여부확인
        const isPasswordPattern = passwordPattern.test(value);
        setPasswordPattern(isPasswordPattern);

        // isPasswordPattern이 참이면 빈 문자열 반환, 아니면 '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.' 반환,
        // 비밀번호 입력값이 존재하지 않으면 빈문자열 반환.
        const passwordMessage = 
            isPasswordPattern ? '' : 
            value ? '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.' : '';
        // 상태변경함수로 비밀번호 값이 바뀔때 표시되는 메시지 반환
        setPasswordMessage(passwordMessage);
        
        const isEqualPassword = passwordCheck === value;
        setEqualPassword(isEqualPassword);

        // 
        const passwordCheckMessage = 
            isEqualPassword ? '' : 
            passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
        setPasswordCheckMessage(passwordCheckMessage);
    };

    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPasswordCheck(value);

        const isEqualPassword = password === value;
        setEqualPassword(isEqualPassword);

        const passwordCheckMessage = 
            isEqualPassword ? '' : 
            value ? '비밀번호가 일치하지 않습니다.' : '';
        setPasswordCheckMessage(passwordCheckMessage);
    };

    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmail(value);
        setEmailButtonStatus(value !== '');
        setEmailCheck(false);
        setAuthNumberCheck(false);
        setEmailMessage('');
    };

    const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setAuthNumber(value);
        setAuthNumberButtonStatus(value !== '');
        setAuthNumberCheck(false);
        setAuthNumberMessage('');
    };

    const onIdButtonClickHandler = () => {
        if(!idButtonStatus) return;
        // trim: 제거해주는 것.
        if(!id || !id.trim()) return;
        
        const requestBody: IdCheckRequestDto = { userId: id };
        // IdCheckRequest(requestBody)작업이 끝나면 then(해당 상황에선 콜백함수를 넣음)작업을 시작
        // apis의 index idChec
        IdCheckRequest(requestBody).then(idCheckResponse);
    };

    const onEmailButtonClickHandler = () => {
        if(!emailButtonStatus) return;

        const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
        const isEmailPattern = emailPattern.test(email);
        if (!isEmailPattern) {
            setEmailMessage('이메일 형식이 아닙니다.');
            setEmailError(true);
            setEmailCheck(false);
            return;
        }

        const requestBody: EmailAuthRequestDto = { userEmail: email };
        EmailAuthRequest(requestBody).then(emailAuthResponse);
    };

    //# 인증번호버튼 클릭 핸들러 함수 정의
    const onAuthNumberButtonClickHandler = () => {
        //! 인증번호버튼상태가 비활성화일 때 반환
        if(!authNumberButtonStatus) return;
        //! 인증번호 입력란이 비어있을 때 반환?
        if(!authNumber) return ; 

        //# EmailAuthCheckRequestDto
        const requestBody: EmailAuthCheckRequestDto = {
            userEmail: email,
            authNumber: authNumber
        };
        //! EmailAuthCheckRequest: 이메일 인증 함수 호출하여 그 결과를 emailAuthCheckResponse에 전달
        //! 매개변수는(requestBody)
        EmailAuthCheckRequest(requestBody).then(emailAuthCheckResponse);
    };

    //# 회원가입버튼 클릭 핸들러 함수 정의
    const onSignUpButtonClickHandler = () => {
        if(!isSignUpActive) return;
        if(!id || !password || !passwordCheck || !email || !authNumber) {
            alert('모든 내용을 입력해 주세요.')
            return;
        }

        const requestBody: SignUpRequestDto = {
            userId: id,
            userPassword: password,
            userEmail: email,
            authNumber: authNumber
        }
        SignUpRequest(requestBody).then(signUpResponse);
    };

    //                    render                    //
    return (
        <div className="authentication-contents">
            <SnsContainer title="SNS 회원가입" />
            <div className="short-divider"></div>
            <div className="authentication-input-container">

                <InputBox label="아이디" type="text" value={id} placeholder="아이디를 입력해주세요" onChangeHandler={onIdChangeHandler} buttonTitle="중복 확인" buttonStatus={idButtonStatus} onButtonClickHandler={onIdButtonClickHandler} message={idMessage} error={isIdError} />

                <InputBox label="비밀번호" type="password" value={password} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />

                <InputBox label="비밀번호 확인" type="password" value={passwordCheck} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordCheckChangeHandler} message={passwordCheckMessage} error />

                <InputBox label="이메일" type="text" value={email} placeholder="이메일을 입력해주세요" onChangeHandler={onEmailChangeHandler} buttonTitle="이메일 인증" buttonStatus={emailButtonStatus} onButtonClickHandler={onEmailButtonClickHandler} message={emailMessage} error={isEmailError} />

                {isEmailCheck && 
                <InputBox label="인증번호" type="text" value={authNumber} placeholder="인증번호 4자리를 입력해주세요" onChangeHandler={onAuthNumberChangeHandler} buttonTitle="인증 확인" buttonStatus={authNumberButtonStatus} onButtonClickHandler={onAuthNumberButtonClickHandler} message={authNumberMessage} error={isAuthNumberError} />}

            </div>
            <div className="authentication-button-container">
                <div className={signUpButtonClass} onClick={onSignUpButtonClickHandler}>회원가입</div>
                <div className="text-link" onClick={onLinkClickHandler}>로그인</div>
            </div>
        </div>
    );
}

//                    component                    //
export default function Authentication() {

    //                    state                    //: 초기화면
    const [page, setPage] = useState<AuthPage>('sign-in');

    //                    event handler                    //
    const onLinkClickHandler = () => {
        if (page === 'sign-in') setPage('sign-up');
        else setPage('sign-in');
    };

    //                    constant                    //
    const AuthenticationContents = 
        page === 'sign-in' ? 
            <SignIn onLinkClickHandler={onLinkClickHandler} /> : 
            <SignUp onLinkClickHandler={onLinkClickHandler} />;
    
    const imageBoxStyle = { backgroundImage: `url(${page === 'sign-in' ? SignInBackground : SignUpBackground})` };

    //                    render                    //
    return (
        <div id="authentication-wrapper">
            <div className="authentication-image-box" style={imageBoxStyle}></div>
            <div className="authentication-box">
                <div className="authentication-container">
                    <div className="authentication-title h1">
                        {"임대 주택 가격서비스"}
                    </div>
                    { AuthenticationContents }
                </div>
            </div>
        </div>
    );
}