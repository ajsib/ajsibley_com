import styled from 'styled-components';
import { Button, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';

const CardContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  font-family: 'Georgia', serif;
  margin: 10px 10px;
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

export default function T1B({ headline, author, program, yearOfStudy, description }) {
  // if yearOfStudy is a number then continue else return 'Unknown Year'
  if (!isNaN(yearOfStudy)) {
    yearOfStudy = mapYearToText(yearOfStudy);
  }
  else {
    yearOfStudy = yearOfStudy;
  }


  return (
    <CardContainer>
      <Headline>{headline}</Headline>
      <Separator />
      <Description dangerouslySetInnerHTML={{ __html: description }} />
      <Footer>
        <small>{author + " "}</small>  {/* Added space after the last character */}
        <small>{`${yearOfStudy}, ${program}`}</small>
      </Footer>
      {/* <InteractionButtons>
        <IconButton color="primary">
          <ThumbUpIcon />
        </IconButton>
        <IconButton color="secondary">
          <AccountCircleIcon />
        </IconButton>
        <Button startIcon={<CommentIcon />}>
          Open Comments
        </Button>
      </InteractionButtons> */}
    </CardContainer>
  );
}
