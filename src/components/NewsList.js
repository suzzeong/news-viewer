import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../../node_modules/axios/index';
import NewsItem from './NewsItem';

const StNewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px){
   width: 100%;
   padding-left: 1rem;
   padding-right: 1rem; 
  }
`

const NewsList = ( {category} ) => {
  const [articles, setArticles] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'all'? '':`&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0b3eb404a9b140d79df25c1985b53b1a`
        );
        setArticles(response.data.articles)
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category])

  if (loading) {
    return <StNewsListBlock>대기중...</StNewsListBlock>
  }

  if (!articles) {
    return null
  }

  return (
    <StNewsListBlock>
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
    </StNewsListBlock>
  );
};

export default NewsList;