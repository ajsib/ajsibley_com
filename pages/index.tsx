import { Button, Container, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const markdown = `# Welcome to ajsibley.com
  ---
  This Site is currently under construction. Please check back later for more content.`;

  return (
    <Container maxWidth="sm">
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Container>
  );
}
