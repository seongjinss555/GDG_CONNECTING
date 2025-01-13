import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ArticleUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState({
    id: 0,
    title: "",
    author: "",
    content: "",
  });

  const { title, author, content } = article;

  const onChange = (event) => {
    const { value, name } = event.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };

  const getArticle = async () => {
    try {
      //const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;
      const response = await axios.get(
        `https://www.kkt333.shop/article-path/${id}`
      );
      setArticle(response.data);
    } catch (error) {
      console.error("게시글 조회 실패:", error);
      alert("게시글을 불러오는 데 실패했습니다.");
    }
  };

  const updateArticle = async () => {
    try {
      //const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;
      await axios.patch(`https://www.kkt333.shop/article-patch?id=${id}`, {
        content, // 내용
      });
      alert("수정되었습니다.");
      navigate(`/article-path/${id}`); // 수정 후 상세 페이지로 돌아가기
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정에 실패했습니다.");
    }
  };

  const backToDetail = () => {
    navigate(`/articles-path/${id}`);
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <div>
      <div>
        <span>제목</span>
        <input type="text" name="title" value={title} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>작성자</span>
        <input type="text" name="author" value={author} readOnly={true} />
      </div>
      <br />
      <div>
        <span>내용</span>
        <textarea
          name="content"
          cols="30"
          rows="10"
          value={content}
          onChange={onChange}
        ></textarea>
      </div>
      <br />
      <div>
        <button onClick={updateArticle}>수정</button>
        <button onClick={backToDetail}>취소</button>
      </div>
    </div>
  );
};

export default ArticleUpdate;
