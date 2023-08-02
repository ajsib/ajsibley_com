import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { MoonLoader } from 'react-spinners'; // Import the spinner you want to use
import { ReactNode } from 'react';

export default function AuthCheck({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.get('https://ajsibleyback-310003c917de.herokuapp.com/api/user/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          // If the user is a new user and not accessing the profile setup page, redirect to the profile setup page
          if (response.data.isNewUser && router.pathname !== '/profile-setup') {
            router.push('/profile-setup');
            return;
          }

          // If the user is already authenticated and accessing the / page, redirect to the home page
          if (router.pathname === '/') {
            router.push('/home');
            return;
          }
        } catch (error) {
          localStorage.removeItem('token');
          if (router.pathname !== '/') {
            router.push('/');
            return;
          }
        }
      } else {
        if (router.pathname !== '/') {
          router.push('/');
          return;
        }
      }

      setLoading(false);
    };

    verifyToken();
  }, [router.pathname]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <MoonLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  return children;
}

