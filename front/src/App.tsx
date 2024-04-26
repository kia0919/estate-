import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { AUTH_PATH, LOCAL_PATH, QNA_DEATAIL_PATH, QNA_PATH, QNA_UPDATE_PATH, QNA_WRITE_PATH, RATIO_PATH, SERVICE_PATH } from './constant/Index';

//# App.tsx에 Routes, Route를 사용하여 네비게이션 지정
function App() {
  return (
    <Routes>
      <Route path={AUTH_PATH} element={<></>} />
      <Route path={SERVICE_PATH} element={<></>} >
        <Route path={LOCAL_PATH} element={<></>} />
        <Route path={RATIO_PATH} element={<></>} />
        <Route path={QNA_PATH} >
          <Route index element = {<></>} />
          <Route path={QNA_WRITE_PATH} element={<></> } />
          <Route path={QNA_DEATAIL_PATH} element={<></> } />
          <Route path={QNA_UPDATE_PATH} element={<></> } />
        </Route>
      </Route>
      {/*//# 존재하지 않는 URL로 접근 시의 네비게이션 지정 */}
      <Route path='*' element={<></>} />
    </Routes>
  );
}

export default App;

// ### authentication (로그인, 회원가입)
// - service
//    - locale(지역 평균)
//    - ratio(비율 계산)
//    - qna(Q&A리스트)
//     - :boardNumber(Q&A 상세보기)
//     - write(Q&A 작성)
//     - update/:boardNumber(Q&A 수정)

