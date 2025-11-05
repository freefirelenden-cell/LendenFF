'use client'

import { useContext, useEffect } from 'react';
import { myContext } from '../context/context';

export default function SyncUserToDB() {
  const { user, isSignedIn } = useContext(myContext);

  useEffect(() => {
    if (!isSignedIn || !user) return;

    const syncUser = async () => {
      try {
        const res = await fetch('/api/auth/sync-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName || '',
            image: user.imageUrl || '',
          }),
        });

        const data = await res.json();
      } catch (error) {
        console.error('❌ Failed to sync user:', error);
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return null; // no UI needed
}
