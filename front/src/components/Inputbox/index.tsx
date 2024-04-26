import React, { ChangeEvent } from "react";
import './style.css';

//! InputBoxProps의 interface 속성 지정.
export interface InputBoxProps {
    label: string;
    type: 'text' | 'password';
    value: string;
    placeholder: string;
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    buttonTitle?: string;
    buttonStatus?: boolean;
    onButtonClickHandler?: () => void;
    message?: string;
    error?: boolean;
}
//* InputBoxProps 인터페이스에서 정의된 속성을 매개변수로 받아 export로 내보냄
export default function InputBox({ label, type, value, placeholder, onChangeHandler, buttonTitle, buttonStatus, onButtonClickHandler, message, error }: InputBoxProps) {
    // buttonStatus가 참일때 input-primary-button, 거짓일 때 input-disable-button 클래스를 buttonClass에 할당(조건부 설정)
    const buttonClass = buttonStatus ? 'input-primary-button' : 'input-disable-button';
    // error가 참일때 'error', 거짓일 때 'primary' messageClass에 할당
    // 오류가 있을시 error메시지가 적용, error가 없을 시 primary가 적용된다.
    const messageClass = ' input-message ' + (error ? 'error' : 'primary'); 
    
    // 반환 값
    return (
        <div className="input-box">
            {/* 인터페이스에서 정의한 {label}을 가져와 렌더링 */}
            <div className="input-label label">{label}</div>
            <div className="input-content-box">
                {/* 입력 상자를 나타내는 input 요소, 앞에서 지정한 인터페이스 InputBoxProps속성을 가지고 옴*/}
                <input
                    className="input"
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChangeHandler}
                />
                {/* buttonTitle이 존재할때만 버튼을 렌더링, 버튼 클릭 시 onButtonClickHandler함수 호출 */}
                { buttonTitle && 
                <div className={buttonClass} onClick={onButtonClickHandler}>
                    {buttonTitle}
                </div> 
                }
            </div>
            {/*{message의 내용은 {message}변수에서 가지고 옴} */}
            <div className={messageClass}>{message}</div>
        </div>
    );
}