'use client'

import { useContext, useEffect } from 'react';
import { myContext } from '../context/context';
import { syncUser } from '@/lib/apiClient';

export default function SyncUserToDB() {
  const { userData, isSignedIn, session, status } = useContext(myContext);

  useEffect(() => {
        if (status !== "authenticated" || !userData && pathname !== '/') return;
        const load = async () => {
            const data = await syncUser(userData);
        }
        load()
    }, [session, isSignedIn]);

  return null; // no UI needed
}
