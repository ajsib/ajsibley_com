import React, { useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import Footer from '../../components/home/Footer';
import HomePage from '../../components/home/pages/HomePage';
import CommunitiesPage from '../../components/home/pages/Communities';
import NewPostPage from '../../components/home/pages/NewPost';
import ConfessionsPage from '../../components/home/pages/Confessions';
import ProfilePage from '../../components/home/pages/ProfilePage';
import Header from '../../components/home/Header';
import apiBaseUrl from '../../utils/apiConfig';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [cardsData, setCardsData] = useState<any[]>([]);;
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (start: number, limit = 29) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiBaseUrl}/api/posts/paginated?start=${start}&limit=${limit}`);
      const { posts } = response.data;
      if (posts.length < limit) setHasMore(false); 
      return posts;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreCards = async () => {
    if (isLoading || !hasMore) return;
    const newPosts = await fetchData(page);
    setCardsData([...cardsData, ...newPosts]);
    setPage(page + newPosts.length);
  };

  return (
    <>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={11}
        mb={8}
      >
        {activeTab === 0 && (
          <HomePage 
            cardsData={cardsData}
            loadMoreCards={loadMoreCards}
            isLoading={isLoading}
            hasMore={hasMore} // NEW
          />
        )}
        {activeTab === 1 && <CommunitiesPage />}
        {activeTab === 2 && <NewPostPage />}
        {activeTab === 3 && <ConfessionsPage />}
        {activeTab === 4 && <ProfilePage />}
      </Box>
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
}
