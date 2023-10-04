// utils/userInfo.ts
import { UserProfile, User } from './UserTypes';  // Import the interfaces

const yearToString = (year: string): string => {
  switch(year) {
    case '1':
      return 'First';
    case '2':
      return 'Second';
    case '3':
      return 'Third';
    case '4':
      return 'Fourth';
    case '5':
      return 'Fifth';
    default:
      return year;
  }
};


const programToEmoji = (program: string): string => {
  switch(program) {
    case 'ArtSci':
      return '🎨';
    case 'Engineering':
      return '🔧';
    case 'Commerce':
      return '💼';
    case 'CompSci':
      return '💻';
    case 'Kin':
      return '🏋️';
    case 'Life Sci':
      return '🔬';
    case 'Health Sci':
      return '🩺';
    case 'Nursing':
      return '👩‍⚕️';
    case 'Con Ed':
      return '📚';
    default:
      return '';
  }
};

const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${date.toLocaleDateString('en-US', options)}`;
}




export const getUserInfo = (): { profile: UserProfile | null, user: User | null } => {
  const storedProfileJSON = localStorage.getItem('profile');
  const storedUserJSON = localStorage.getItem('user');

  let profile: UserProfile | null = storedProfileJSON ? JSON.parse(storedProfileJSON) : null;
  let user: User | null = storedUserJSON ? JSON.parse(storedUserJSON) : null;

  if (profile) {
    profile = {
      ...profile,
      yearOfStudyString: yearToString(profile.yearOfStudy),
      programEmoji: programToEmoji(profile.program),
    };
  }

  if (user) {
    user = {
      ...user,
      dateJoinedHR: formatDate(user.dateJoined),
    };
  }

  return { profile, user };
};