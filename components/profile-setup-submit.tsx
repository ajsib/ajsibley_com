import axios from 'axios';
import Router from 'next/router';

interface FormData {
  name: string;
  program: string;
  yearOfStudy: string;
  bio: string;
  clubsAndOrgs: string;
  contactInfo: string;
}

export const submitProfile = async (formData: FormData) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token found');
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.post('https://ajsibleyback-310003c917de.herokuapp.com/api/profile/create', formData, config);

    if (response.data.message === 'Profile created successfully') {
      // Perform some action, maybe navigate the user to the home page
        Router.push('/home');
    }
  } catch (error) {
    console.error('Error submitting profile:', error);
    // Handle the error appropriately
  }
};
