"use client";

import { currentUserProfileAction } from "@/server/profiles/current-user-profile";
import { useEffect, useState } from "react";

const Page = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getProfile = async () => setProfile(await currentUserProfileAction());

    getProfile();
  }, []);

  return (
    <main>
      {JSON.stringify(profile)}
      <h1>Protected Page</h1>
      <p>not public page</p>
    </main>
  );
};

export default Page;
