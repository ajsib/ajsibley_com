import styled from 'styled-components';

const CardContainer = styled.div`
  padding: 15px;  // Increased padding
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  font-family: 'Georgia', serif;
  margin: 0;
`;

const Headline = styled.h1`
  font-size: 24px;  // Increased font-size
  font-weight: bold;
  color: #333;
  margin: 8px 0;  // Adjusted margin
  text-align: center;
`;

const Separator = styled.hr`
  width: 80%;
  border: 0.5px solid #777;
  margin: 5px 0;
`;

const Description = styled.p`
  font-size: 18px;  // Increased font-size
  color: #777;
  margin: 4px 0;  // Adjusted margin
  text-align: justify;
  line-height: 1.4;  // Increased line-height
  white-space: pre-wrap;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-transform: uppercase;  // Make text all caps
  font-size: 16px;  // Increased font-size from 14px to 16px
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
  const formattedYear = mapYearToText(yearOfStudy);

  return (
    <CardContainer>
      <Headline>{headline}</Headline>
      <Separator />
      <Description dangerouslySetInnerHTML={{ __html: description }} />
      <Footer>
        <small>{author}</small>
        <small>{`${formattedYear}, ${program}`}</small>
      </Footer>
    </CardContainer>
  );
}

