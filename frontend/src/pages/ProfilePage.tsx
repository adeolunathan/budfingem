// frontend/src/pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import authApi from '../api/auth';

interface ProfileData {
  userId: string;
  username: string;
  email: string;
  roles?: string[]; // roles is now optional (using ?) and can be undefined or an array of strings
  // Add other profile fields if needed based on your backend response
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('budfin_jwt_token');

      if (!token) {
        setError('Unauthorized: No token found. Please login.');
        setLoading(false);
        return;
      }

      try {
        const profileData = await authApi.getProfile(token);
        setProfile(profileData.user);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'Failed to fetch profile.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  if (!profile) {
    return <p>Could not load profile information.</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>User ID:</strong> {profile.userId}</p>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p>
        <strong>Roles:</strong>{' '}
        {/* Robustly handle roles being potentially undefined or not an array */}
        {profile.roles && Array.isArray(profile.roles)
          ? profile.roles.join(', ')
          : 'Roles not available'}
      </p>
      {/* Display other profile fields here */}
    </div>
  );
};

export default ProfilePage;