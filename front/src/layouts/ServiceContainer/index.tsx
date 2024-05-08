import React, { useEffect, useState } from 'react';
import './style.css';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { AUTH_ABSOLUTE_PATH, LOCAL_ABSOLUTE_PATH, QNA_LIST_ABSOLUTE_PATH, RATIO_ABSOLUTE_PATH } from 'src/constant/Index';
import { Cookies, useCookies } from 'react-cookie';
import { getSignInUserRequest } from 'src/apis/user';
import { GetSignInUserResponseDto } from 'src/apis/user/dto/response';
import ResponseDto from 'src/apis/response.dto';
import useUserStore from 'src/stores/user.store';

//# 사용자 인증 및 메인화면 기능 및 구현관리?
// 경로관리: 지역평균서비스에 대한 경로
// 경로관리: 비율계산서비스에 대한 경로
// 경로관리: Q&A게시판서비스에 대한 경로
// 경로관리: '' 경로가 없음
type Path = '지역 평균' | '비율 계산' | 'Q&A 게시판' | '';

//                    interface                    //
// 속성 및 타입 지정
interface Props {
  path: Path;
}

//                    component                    //
// 상단바를 표시하는 컴포넌트, Props의 속성 path를 가져옴
function TopBar({ path }: Props) {

  //                    state                    //
  // loginUserRole: 사용자 정보상태
  const { loginUserRole } = useUserStore();
  // cookise: 상태함수, setCookie: 상태변경함수, removeCookie: 쿠키제거함수
  const [cookies, setCookie, removeCookie] = useCookies();

  //                    function                    //
  // navigator 함수 생성
  // useNavigate: 리액트에서 제공되는 훅(페이지 이동할 때 사용)
  const navigator = useNavigate();


  //                    event handler                    //
  const onLogoutClickHandler = () => {
    removeCookie('accessToken', { path: '/' });
    navigator(AUTH_ABSOLUTE_PATH);
};
    

  //                    render                    //
  return (
    <>
    <div className="logo-container">임대주택 가격 서비스</div>
    <div className="top-bar-container">
        <div className="top-bar-title">{ path }</div>
        <div className="top-bar-right">
            { loginUserRole === 'ROLE_ADMIN' && <div className="top-bar-role">관리자</div> }
            <div className="second-button" onClick={onLogoutClickHandler}>로그아웃</div>
        </div>
    </div>
    </>
  );
}

//                    component                    //
// Props의 pathName속성을 가져옴
function SideNavigation({ path }: Props) {
  // 각 제목에 맞는 클래스 생성, 
  const localClass = `side-navigation-item${path === '지역 평균' ? ' active' : ''}`;
  const ratioClass = `side-navigation-item${path === '비율 계산' ? ' active' : ''}`;
  const qnaClass = `side-navigation-item${path === 'Q&A 게시판' ? ' active' : ''}`;

  //                    state                    //
  const { pathname } = useLocation();

  //                    function                    //
  const navigator = useNavigate();

  //                    event handler                    //
  // 버튼 클릭 시 해당 페이지로 이동
  const onLocalClickHandler = () => navigator(LOCAL_ABSOLUTE_PATH);
  // 버튼 클릭 시 해당 페이지로 이동
  const onRatioClickHandler = () => navigator(RATIO_ABSOLUTE_PATH);
  // 버튼 클릭 시 해당 페이지로 이동
  const onQnaClickHandler = () => navigator(QNA_LIST_ABSOLUTE_PATH);

  //                    render                    //
  return (
    <div className="side-navigation-container">
        <div className={localClass} onClick={onLocalClickHandler}>
            <div className="side-navigation-icon chart"></div>
            <div className="side-navigation-title">지역 평균</div>
        </div>
        <div className={ratioClass} onClick={onRatioClickHandler}>
            <div className="side-navigation-icon pie"></div>
            <div className="side-navigation-title">비율 계산</div>
        </div>
        <div className={qnaClass} onClick={onQnaClickHandler}>
            <div className="side-navigation-icon edit"></div>
            <div className="side-navigation-title">Q&A 게시판</div>
        </div>
    </div>
);
}
//                    component                    //
export default function ServiceContainer() {

  //                    state                    //
  // path에대한 값을 가져올 수 있음
  const { pathname } = useLocation();
    const { setLoginUserId, setLoginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [path, setPath] = useState<Path>('');

  //                    function                    //
  const navigator = useNavigate();

  const getSignInUserResponse = (result: GetSignInUserResponseDto | ResponseDto | null) => {

    const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
            

        if (!result || result.code !== 'SU') {
            alert(message);
            navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        const { userId, userRole } = result as GetSignInUserResponseDto;
        setLoginUserId(userId);
        setLoginUserRole(userRole);

    };

  //                    effect                    //
  // 컴포넌트가 렌더링될 때 특정 작업을 수행하도록 설정할 수 있는 훅
  useEffect(() => {
    const path =
      // LOCAL_ABSOLUTE_PATH 이면은 '지역 평균'
      pathname === LOCAL_ABSOLUTE_PATH ? '지역 평균' :
      pathname === RATIO_ABSOLUTE_PATH ? '비율 계산' :
      // QNA_LIST_ABSOLUTE_PATH으로 시작하는 확인후 그렇다면 
      pathname.startsWith(QNA_LIST_ABSOLUTE_PATH) ? 'Q&A 게시판' : '';

    setPath(path);

  }, [pathname]);

  useEffect(() => {

    if (!cookies.accessToken) {
      navigator(AUTH_ABSOLUTE_PATH);
      return;
    }

    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);

  }, [cookies.accessToken]);

  //                    render                    //
  return (
    <div id="wrapper">
        <TopBar path={path} />
        <SideNavigation path={path} />
        <div className="main-container">
            {/* APP.TSX에 있는 Route들을 화면에 송출해줌??  */}
            <Outlet />
        </div>
    </div>
  )
}
