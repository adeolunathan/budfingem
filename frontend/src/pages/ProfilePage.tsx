// frontend/src/pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import authApi from '../api/auth';

interface ProfileData {
  userId: string;
  username: string;
  email: string;
  roles: string[];
  // Add other profile fields if needed based on your backend response
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); // Start loading
      setError('');
      const token = localStorage.getItem('budfin_jwt_token'); // Get JWT token from localStorage

      if (!token) {
        setError('Unauthorized: No token found. Please login.');
        setLoading(false);
        return; // Stop fetching if no token
      }

      try {
        const profileData = await authApi.getProfile(token);
        setProfile({
          userId: profileData.user.id,
          username: profileData.user.username,
          email: profileData.user.email,
          roles: profileData.user.roles,
          // Map other fields if needed
        }); // Map id to userId
        setLoading(false); // Loading complete
      } catch (err: unknown) {
        console.error('Error fetching profile:', err);
        
        // Type guard to safely access err.message
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch profile.');
        }
        
        setLoading(false); // Loading complete (even with error)
      }
    };

    fetchProfile(); // Call fetchProfile on component mount
  }, []); // Empty dependency array means useEffect runs only once on mount

  if (loading) {
    return <p>Loading profile...</p>; // Show loading message
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>; // Show error message
  }

  if (!profile) {
    return <p>Could not load profile information.</p>; // Fallback if profile is still null after fetching
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>User ID:</strong> {profile.userId}</p>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Roles:</strong> {profile.roles.join(', ')}</p> {/* Display roles as comma-separated string */}
      {/* Display other profile fields here */}
    </div>
  );
};

export default ProfilePage;