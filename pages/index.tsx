// ./pages/index.tsx
import { Button, Container, Grid, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default function Home() {
  const markdown = ` # Welcome to ajsibley.com 👋
  ---

  Every conversation is a blank canvas and you are the artists.  
  Why not paint a masterpiece? ✨`;

  return (
    <Container maxWidth="sm">
      <ReactMarkdown>{markdown}</ReactMarkdown>

      {/* Login and Sign Up Buttons */}
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Link href="/login" passHref>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/signup" passHref>
            <Button variant="contained" color="secondary">
              Sign Up
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
