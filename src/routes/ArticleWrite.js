import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
const ArticleWrite = () => {
  const navigate = useNavigate();

  const [write, setWrite] = useState({
    title: "",
    content: "",
    author: "",
  });

  const { title, content, author } = write; //비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target; //event.tart에서 name과 value만 가져오기
    setWrite({
      ...write,
      [name]: value,
    });
  };

  const savedArticle = async () => {
    const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;
    await axios.post(`${BACKEND_IP}/article-create`, write).then((res) => {
      alert("글이 등록되었습니다.");
      navigate("/articles");
    });
  };

  const returnToList = () => {
    navigate("/articles");
  };

  return (
    <div>
      <Helmet>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Helmet>
      <div>
        <span>제목</span>
        <input type="text" name="title" value={title} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>작성자</span>
        <input type="text" name="author" value={author} onChange={onChange} />
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
      <div>
        <button onClick={savedArticle}>저장</button>
        <button onClick={returnToList}>취소</button>
      </div>
    </div>
  );
};

export default ArticleWrite;
