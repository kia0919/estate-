package com.estate.back.entity;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

import com.estate.back.dto.request.board.PostBoardRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//# estate 데이터베이스의 board 테이블과 매핑되는 Entity 클래스

@Entity(name="board")
@Table(name="board")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer receptionNumber;
    private Boolean status;
    private String title;
    private String contents;
    private String writerId;
    private String writeDatetime;
    private Integer viewCount;
    private String comment;

    //# DTO로 변환하는 역할
    // PostBoardRequestDto객체와 사용자ID를 받아와서 해당 정보를 기반으로 BoardEntity객체 생성 -> DTO로 변환함
    public BoardEntity(PostBoardRequestDto dto, String userId) {
        Date now = Date.from(Instant.now());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String writeDatetime = simpleDateFormat.format(now);

        this.status = false;    
        this.title = dto.getTitle(); 
        this.contents = dto.getContents();
        this.writerId = userId;
        this.writeDatetime = writeDatetime;
        this.viewCount = 0;
    }
}