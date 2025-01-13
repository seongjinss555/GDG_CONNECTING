import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;

  const getArticles = async () => {
    try {
      const resp = await (await axios.get(`${BACKEND_IP}/articles`)).data; //게시글 목록 데이터 할당
      setArticles(resp); //articles 변수에 저장 *api 명세서는 json으로 받기 때문에 resp.data말고 resp 그 자체를 받자! resp.data를 넣으면 객체에 포함된 데이터 배열을 불러온다.
      //console.log(resp);
    } catch (error) {
      console.error("Error Fetching articles:", error);
    }
  };

  const createArticle = () => {
    navigate("/article-create");
  };

  useEffect(() => {
    getArticles();
  }, []); //게시글 목록 조회

  return (
    <div>
      <Helmet>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Helmet>
      <h1>게시글 목록</h1>
      <ul>
        {Array.isArray(articles) && articles.length > 0 ? (
          articles.map((article) => (
            <li key={article.id}>
              <h3>
                <Link to={`/article-path/${article.id}`}>{article.title}</Link>
                {/*link to는 상대 경로 이용!  */}
              </h3>
              <p>작성자: {article.author}</p>
              <p>작성일: {new Date(article.createdAt).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <li>게시글이 없습니다.</li> // 데이터가 없을 때 표시할 메시지
        )}
      </ul>
      <div>
        <button onClick={createArticle}>글쓰기</button>
      </div>
    </div>
  );
};
export default Articles;
