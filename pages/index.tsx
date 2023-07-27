import { Button, Container, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const markdown = ` # Welcome to ajsibley.com 👋
  ---

  This Site is a blank canvas and you are the artist.

**Question** : if you make any idea into a reality, what would it be?  
**Answer** : Let Us Know 
# 👇`;

  return (
    <Container maxWidth="sm">
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <Button
        variant="contained"
        color="primary"
      >
  Click Me
</Button>

    </Container>
  );
}
