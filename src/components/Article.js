import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Article = ({ id, title, content, author, createdAt }) => {
  const navigate = useNavigate();
  //const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;

  const modifyArticle = () => {
    navigate("/article-patch/" + id);
  };

  const deleteArticle = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`https://www.kkt333.shop/article-delete?id=${id}`); // 쿼리 파라미터로 ID 전달
        alert("삭제되었습니다.");
        navigate("/articles");
      } catch (error) {
        if (error.response) {
          alert(
            `삭제 실패: ${
              error.response.data.message || "게시글을 찾을 수 없습니다."
            }`
          );
        } else {
          alert("삭제 요청 중 오류가 발생했습니다.");
        }
      }
    }
  };

  const returnToList = () => {
    navigate("/articles");
  };

  return (
    <div>
      <div>
        <h2>{title}</h2>
        <h4>{author}</h4>
        <h4>{createdAt}</h4>
        <hr />
        <p>{content}</p>
      </div>
      <div>
        <button onClick={modifyArticle}>수정</button>
        <button onClick={deleteArticle}>삭제</button>
        <button onClick={returnToList}>목록</button>
      </div>
    </div>
  );
};

export default Article;
