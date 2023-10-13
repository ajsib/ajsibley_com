import React, { useState, useEffect } from 'react';
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

  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [fetchedTabs, setFetchedTabs] = useState<Set<number>>(new Set());
  const [profileId, setProfileId] = useState<string>('');

  const authToken = localStorage.getItem('token');

  const fetchDataForSelectedTab = async () => {
    if (!userProfileOpen) return;
  
    if (fetchedTabs.has(selectedTab)) return;
  
    setIsLoading(true);
  
    try {
      let response;
      let nextStart = 0; // Initialize nextStart for infinite scroll
      const limit = 10; // Matched with the backend limit
  
      console.log(profileId);
  
      if (selectedTab === 0) { // Assuming 0 is for Posts
        response = await axios.get(`${apiBaseUrl}/api/profile/${profileId}/posts?start=${nextStart}&limit=${limit}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
  
        const { posts, nextStart: newNextStart } = response.data;
        
        if (posts.length < limit) setHasMore(false); // If fewer posts than limit, set 'hasMore' to false
  
        nextStart = newNextStart; // Update nextStart for the next API call
        
        console.log(posts);
        setFetchedData(posts);
      }
  
      // Implement other tabs as needed...
  
      setFetchedTabs(new Set(fetchedTabs).add(selectedTab)); // Mark tab as fetched
  
    } catch (error) {
      console.error(`Error fetching data for tab ${selectedTab}:`, error);
    } finally {
      setIsLoading(false);
    }
  };
  

  // Fetch data when selectedTab changes
  useEffect(() => {
    fetchDataForSelectedTab();
  }, [selectedTab]);

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
            hasMore={hasMore}
            // Pass profile tab data
            selectedTab={selectedTab} 
            setSelectedTab={setSelectedTab} 
            data={fetchedData} // Pass down the fetched data
            setProfileId={setProfileId} // Pass down the profile ID setter
            setUserProfileOpen={setUserProfileOpen} // Pass down the profile open setter
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
