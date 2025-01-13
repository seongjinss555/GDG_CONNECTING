import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Articles from "./routes/Articles";
import ArticleWrite from "./routes/ArticleWrite";
import ArticleDetail from "./routes/ArticleDetail";
import ArticleUpdate from "./routes/ArticleUpdate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/article-create" element={<ArticleWrite />} />
      <Route path="/article-path/:id" element={<ArticleDetail />} />
      <Route path="/article-patch/:id" element={<ArticleUpdate />} />
    </Routes>
  );
}

export default App;
