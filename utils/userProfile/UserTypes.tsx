// utils/UserTypes.ts

export interface UserProfile {
  _id: string;
  name: string;
  program: string;
  yearOfStudy: string; // Allow yearOfStudy to be string or number
  bio: string;
  user: string;
  __v: number;
  yearOfStudyString: string; // Optional field for the string version of year
  programEmoji: string; // Optional field for program emoji
}

export interface User {
  _id: string;
  username: string;
  emailPhone: string;
  isNewUser: boolean;
  dateJoined: string;
  dateJoinedHR: string;
}
