import React, { useEffect, useState } from 'react';
import './style.css';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { AUTH_ABSOLUTE_PATH, LOCAL_ABSOLUTE_PATH, QNA_LIST_ABSOLUTE_PATH, RATIO_ABSOLUTE_PATH } from 'src/constant/Index';
import { useCookies } from 'react-cookie';

type Path = '지역 평균' | '비율 계산' | 'Q&A 게시판' | '';

//                    interface                    //
// 속성 및 타입 지정
interface Props {
  path: Path;
}

//                    component                    //
function TopBar({ path }: Props) {

  //                    state                    //
  const [cookie, setCookie, removeCookie] = useCookies();

  //                    function                    //
  const navigator = useNavigate();


  //                    event handler                    //
  const onLogutClickHandler = () => {
    // accessToken 토큰이 제거가 됨, 모든 경로에서 해당 쿠키를 제거
    removeCookie('accessToken', { path: '/' });
    //제거가 되면은 해당 경로로 이동
    navigator(AUTH_ABSOLUTE_PATH)
  };

  //                    render                    //
  return (
    <>
    <div className="logo-container">임대주택 가격 서비스</div>
        <div className="top-bar-container">
            <div className="top-bar-title">{path}</div>
            <div className="top-bar-right">
              <div className="top-bar-role">관리자</div>
              <div className="second-button" onClick={onLogutClickHandler}>로그아웃</div>
            </div>
        </div>
    </>
  );
}

//                    component                    //
// Props의 pathName속성을 가져옴
function SideNavigation ({ path }: Props ) {

  const localClass = `side-navigation-item${path === '지역 평균' ? ' active' : ''}`;
  const ratioClass = `side-navigation-item${path === '비율 계산' ? ' active' : ''}`;
  const qnaClass = `side-navigation-item${path === 'Q&A 게시판' ? ' active' : ''}`;

  //                    render                    //
  const navigator = useNavigate();

  //                    event handler                    //
  // 버튼 클릭 시 해당 페이지로 이동
  const onLocalClickHandler = () => navigator(LOCAL_ABSOLUTE_PATH);
  
  const onRatioClickHandler = () => navigator(RATIO_ABSOLUTE_PATH);

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
  const [ path, setPath] = useState<Path>('');

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
