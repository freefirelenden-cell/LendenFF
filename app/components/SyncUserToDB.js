'use client'

import { useContext, useEffect } from 'react';
import { myContext } from '../context/context';
import { syncUser } from '@/lib/apiClient';

export default function SyncUserToDB() {
  const { user, isSignedIn, session, isUserExistInDB } = useContext(myContext);

  useEffect(() => {
    if (!isSignedIn || !user || isUserExistInDB) return;
    const load = async () => {
      const newData = {
        authId: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: "user",
        phone: user.phone,
      }
      const newUser = await syncUser(newData);
      if(newUser.syncUser){
        session.update()
      }
    }
    load()
  }, [session, isSignedIn]);

  return null; // no UI needed
}
