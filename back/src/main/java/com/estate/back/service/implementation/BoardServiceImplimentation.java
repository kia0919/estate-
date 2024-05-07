package com.estate.back.service.implementation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.estate.back.dto.request.board.PostBoardRequestDto;
import com.estate.back.dto.response.ResponseDto;
import com.estate.back.dto.response.board.GetBoardListResponseDto;
import com.estate.back.dto.response.board.GetBoardResponseDto;
import com.estate.back.dto.response.board.GetSearchBoardListResponseDto;
import com.estate.back.entity.BoardEntity;
import com.estate.back.repository.BoardRepository;
import com.estate.back.repository.UserRepository;
import com.estate.back.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplimentation implements BoardService {
    
    // 의존성 주입
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<ResponseDto> postBoard(PostBoardRequestDto dto, String userId) {
        
        try {

            boolean isExistUser = userRepository.existsByUserId(userId);
            // 만약에 false이면은 return ResponseDto.authenticationFailed 반환
            if (!isExistUser) return ResponseDto.authenticationFailed();

            // BoardEntity 생성 위의 dto와 userId를 가져옴
            BoardEntity boardEntity = new BoardEntity(dto, userId);
            boardRepository.save(boardEntity);

        // catch: 발생하는 예외를 출력, databaseError를 반환
        }catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        // Try블럭이 정상 실행 시 ResponseDto에 있는 success를 반환
        return ResponseDto.success();

    }

    @Override
    public ResponseEntity<? super GetBoardListResponseDto> getBoardList() {
        
        try {

            List<BoardEntity> boardEntities = boardRepository.findByOrderByReceptionNumberDesc();

            return GetBoardListResponseDto.success(boardEntities);

        }catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }


    }

    //# Search service
    // SELECT * FROM board(board에서 작업)
    // WHERE(조건) title LIKE '%searchWord%'
    // ORDER BY reception_number DESC;

    // findByTitleContainsOrderByReceptionNumberDesc();
    @Override
    public ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(String searchWord) {

        try {

            List<BoardEntity> boardEntities = boardRepository.findByTitleContainsOrderByReceptionNumberDesc(searchWord);
            return GetSearchBoardListResponseDto.success(boardEntities);
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        
    }

    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(int receptionNumber) {
        
        try {

            BoardEntity boardEntity = boardRepository.findByReceptionNumber(receptionNumber);
            if (boardEntity == null) return ResponseDto.noExistBoard();

            return GetBoardResponseDto.success(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

    }

    @Override
    public ResponseEntity<ResponseDto> increaseViewCount(int receptionNumber) {

        try {

            BoardEntity boardEntity = boardRepository.findByReceptionNumber(receptionNumber);
            if(boardEntity == null) return ResponseDto.noExistBoard();

            boardEntity.increaseViewCount();
            boardRepository.save(boardEntity);
            

        }catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();

    }
    
}
