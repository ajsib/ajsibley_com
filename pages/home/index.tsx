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
  const [cardsData, setCardsData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [fetchedTabs, setFetchedTabs] = useState<Set<number>>(new Set());
  const [profileId, setProfileId] = useState<string>('');
  const [dataByTab, setDataByTab] = useState<{ [key: number]: any[] }>({});

  const authToken = localStorage.getItem('token');

  const fetchDataForSelectedTab = async () => {
    if (!userProfileOpen) return;

    if (fetchedTabs.has(selectedTab)) return;

    setIsLoading(true);

    try {
      let response;
      let nextStart = 0; // Initialize nextStart for infinite scroll
      const limit = 10; // Matched with the backend limit

      console.log(`profileId: ${profileId}, authToken: ${authToken}`); // Debugging Line9

      console.log(profileId);

      if (selectedTab === 0) {
        console.log("Making API call for tab 0"); // Debugging Line
        response = await axios.get(`${apiBaseUrl}/api/profile/${profileId}/posts?start=${nextStart}&limit=${limit}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const { posts, nextStart: newNextStart } = response.data;

        if (posts.length < limit) setHasMore(false);

        nextStart = newNextStart;

        console.log(posts);
        setDataByTab((prevData) => ({
          ...prevData,
          [selectedTab]: posts,
        }));
      }
      if (selectedTab === 1) {
        console.log("Making API call for tab 1");
        response = await axios.get(`${apiBaseUrl}/api/profile/${profileId}/likes?start=${nextStart}&limit=${limit}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const { likes, nextStart: newNextStart } = response.data;

        if (likes.length < limit) setHasMore(false);

        nextStart = newNextStart;

        console.log(likes);
        setDataByTab((prevData) => ({
          ...prevData,
          [selectedTab]: likes,
        }));
      }
      // if (selectedTab === 2) {
      //   console.log("Making API call for tab 2");
      //   response = await axios.get(`${apiBaseUrl}/api/profile/${profileId}/following?start=${nextStart}&limit=${limit}`, {
      //     headers: { Authorization: `Bearer ${authToken}` },
      //   });

      //   const { posts, nextStart: newNextStart } = response.data;

      //   if (posts.length < limit) setHasMore(false);

      //   nextStart = newNextStart;

      //   console.log(posts);
      //   setDataByTab((prevData) => ({
      //     ...prevData,
      //     [selectedTab]: posts,
      //   }));
      // }
      // if (selectedTab === 3) {
      //   console.log("Making API call for tab 3");
      //   response = await axios.get(`${apiBaseUrl}/api/profile/${profileId}/followers?start=${nextStart}&limit=${limit}`, {
      //     headers: { Authorization: `Bearer ${authToken}` },
      //   });

      //   const { posts, nextStart: newNextStart } = response.data;

      //   if (posts.length < limit) setHasMore(false);

      //   nextStart = newNextStart;

      //   console.log(posts);
      //   setDataByTab((prevData) => ({
      //     ...prevData,
      //     [selectedTab]: posts,
      //   }));
      // }

      setFetchedTabs(new Set(fetchedTabs).add(selectedTab));
    } catch (error) {
      console.error(`Error fetching data for tab ${selectedTab}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect called');
    fetchDataForSelectedTab();
  }, [selectedTab, userProfileOpen]);

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
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            data={dataByTab[selectedTab] || []} // Updated to use data from state object
            setProfileId={setProfileId}
            setUserProfileOpen={setUserProfileOpen}
          />
        )}
        {/* {activeTab === 1 && <CommunitiesPage />} */}
        {activeTab === 1 && <NewPostPage />}
        {/* {activeTab === 3 && <ConfessionsPage />} */}
        {activeTab === 2 && <ProfilePage />}
      </Box>
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
}
