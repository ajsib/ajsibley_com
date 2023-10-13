import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import apiBaseUrl from '../../../../utils/apiConfig';
import axios from 'axios';
import { getUserInfo } from '../../../../utils/userProfile/UserInfo';

const CardContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  font-family: 'Georgia', serif;
  margin: 10px 10px;
  min-width: 70%;
`;

const Headline = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 8px 0;
  text-align: center;
`;

const Separator = styled.hr`
  width: 80%;
  border: 0.5px solid #777;
  margin: 5px 0;
`;

const Description = styled.p`
  font-size: 18px;
  color: #777;
  margin: 12px 0;
  text-align: justify;
  line-height: 1.4;
  white-space: pre-wrap;
  overflow-wrap: break-word;  // This line ensures text wraps to next line
`;


const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-transform: uppercase;
  font-size: 16px;
  font-family: 'Georgia', serif;
  padding-top: 30px;
`;

const InteractionButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 12px;
`;

const CommentSection = styled.div`
  width: 100%;
  margin-top: 12px;
`;

const mapYearToText = (year) => {
  const yearMapping = {
    '1': 'First Year',
    '2': 'Second Year',
    '3': 'Third Year',
    '4': 'Fourth Year',
    '5': 'Fifth Year',
    'masters+': 'Masters+'
  };
  return yearMapping[year] || 'Unknown Year';
};


export default function T1B({ headline, author, program, yearOfStudy, description, postId }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const profileInfo = getUserInfo();

  if (!isNaN(yearOfStudy)) {
    yearOfStudy = mapYearToText(yearOfStudy);
  }
  else {
    yearOfStudy = yearOfStudy;
  }

  const AlreadyLiked = async () => {
    if (profileInfo.profile.postInfo.likes.includes(postId)) {
      return true;
    }
    return false;
  };

  const handleLike = async () => {
    try {  
      // Making a POST request to like the post.
      const token = localStorage.getItem('token');
      const profileId = profileInfo.profile._id;
      const response = await axios.post(`${apiBaseUrl}/api/profile/${profileId}/like/${postId}`, {}, { 
        headers: {
          // Your authentication token header here, if applicable
          'Authorization': 'Bearer ' + token 
        }
      });
  
      // Upon successful response, update local state.
      if (response.status === 200) {
        setIsLiked(true);
        console.log('Post liked successfully', response.data);
      }
      if (response.status === 400) {
        console.log('Post already liked by this user');
      }
    } catch (error) {
      // Log the error and do not update local state.
      console.error('An error occurred while liking the post:', error);
    }
  };

  const handleComment = () => {

  };

  const handleLikeAndStateChange = () => {
    if (!isLiked) {  // Only proceed to like if the post is not already liked.
      handleLike();
    } else {
      // If you want to implement unlike functionality, you could call a different function here.
      console.log('Post is already liked.');
    }
  };
  
  const handleCommentAndStateChange = () => {
    setShowComments(prevState => !prevState);  // Toggle comment section visibility
    handleComment();  // Handle additional logic for comment
  };


 return (
    <CardContainer>
      <Headline>{headline}</Headline>
      <Separator />
      <Description dangerouslySetInnerHTML={{ __html: description }} />
        <Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{author + " "}</div>
          <div>{`${yearOfStudy}, ${program}`}</div>
        </Footer>
      <InteractionButtons>
        <IconButton onClick={handleLikeAndStateChange}>
          {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton onClick={handleCommentAndStateChange}>
          <CommentIcon />
        </IconButton>
      </InteractionButtons>
      {showComments && (
        <CommentSection>
          {/* You can put your comment component or logic here */}
          <p>Comment section</p>
        </CommentSection>
      )}
    </CardContainer>
  );
};