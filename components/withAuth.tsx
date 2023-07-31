// components/withAuth.tsx
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const withAuth = (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get('/api/user');
          // User is authorized, continue rendering the page
        } catch (error) {
          // User is not authorized, redirect to the home page
          router.push('/');
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
