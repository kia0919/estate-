package com.estate.back.service;

import org.springframework.http.ResponseEntity;

import com.estate.back.dto.request.board.PostBoardRequestDto;
import com.estate.back.dto.response.ResponseDto;

public interface BoardService {
    // 반환: ResponseEntity  타입: ResponseDto 메서드 이름: postBoard 매개변수: PostBoardRequestDto
    ResponseEntity<ResponseDto> postBoard(PostBoardRequestDto dto, String userId);

}
