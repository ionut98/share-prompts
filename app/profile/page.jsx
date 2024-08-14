"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);

  const fetchPrompts = useCallback(async () => {
    const response = await fetch(`/api/users/${session?.user.id}/prompts`);
    const data = await response.json();

    setPrompts(data);
  }, []);

  useEffect(() => {
    if (session?.user.id) {
      fetchPrompts();
    }
  }, [fetchPrompts, session]);

  const handleEdit = useCallback((prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  }, []);

  const handleDelete = useCallback(async (prompt) => {}, []);

  return (
    <Profile
      name={session?.user.name || "My"}
      desc="Welcome to your personalized profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
