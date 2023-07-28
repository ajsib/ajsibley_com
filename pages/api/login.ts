// ./pages/api/login.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  try {
    const response = await axios.post('http://localhost:3002/api/users/login', {
      username,
      password
    });

    // If successful, return a success message
    if (response.data.success) {
      return res.status(200).json({ success: true, message: 'User authenticated!' });
    }

    // If not successful, return the error message
    return res.status(401).json({ success: false, message: 'Authentication failed.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'An error occurred.' });
  }
}
