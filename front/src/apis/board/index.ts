import axios from "axios";
import { PostBoardRequestDto } from "./dto/request";
import { POST_BOARD_REQUEST_URL } from "src/constant/Index";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";


//  function: Q&A 작성 API 함수
export const postBoardRequest = async(RequestBody: PostBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_BOARD_REQUEST_URL, RequestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        // 정상실행하지 않으면 에러처리 핸들러 실행
        .catch(requestErrorHandler);
    return result;
};