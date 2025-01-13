import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Article from "../components/Article";
import { Helmet } from "react-helmet";

const ArticleDetail = () => {
  const { id } = useParams(); // 아이디로 찾아오기
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;

  const getArticle = async () => {
    try {
      const resp = await axios.get(`${BACKEND_IP}/article-path/${id}`);
      setArticle(resp.data); // resp.data에 실제 데이터가 들어있음
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("게시글을 찾을 수 없습니다.");
      } else {
        console.error("Error Fetching article:", error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <div>
      <Helmet>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Helmet>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Article
          id={article.id}
          title={article.title}
          author={article.author}
          createdAt={article.createdAt}
          content={article.content}
        />
      )}
    </div>
  );
};

export default ArticleDetail;
