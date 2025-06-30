
import React, { useState, useEffect } from 'react';
import type { UserProfile } from './types';
import ProfileSetup from './components/ProfileSetup';
import Dashboard from './components/Dashboard';
import { SparklesCore } from './components/ui/Sparkles';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Attempt to load profile from localStorage to persist session
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    setIsLoading(false);
  }, []);

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  const handleResetProfile = () => {
    localStorage.removeItem('userProfile');
    setUserProfile(null);
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-bg-primary flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg-primary font-sans relative">
       <div className="absolute inset-0 h-full w-full">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.2}
          maxSize={1.2}
          particleDensity={50}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="relative z-10">
        {userProfile ? (
          <Dashboard userProfile={userProfile} onResetProfile={handleResetProfile} />
        ) : (
          <ProfileSetup onComplete={handleProfileComplete} />
        )}
      </div>
    </main>
  );
};

export default App;
