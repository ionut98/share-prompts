"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const name = searchParams.get("name");

  const [prompts, setPrompts] = useState([]);

  const fetchPrompts = useCallback(async () => {
    const response = await fetch(`/api/users/${userId}/prompts`);
    const data = await response.json();

    setPrompts(data);
  }, []);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  const handleEdit = useCallback((prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  }, []);

  const handleDelete = useCallback(async (prompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete the prompt?");

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setPrompts((prev) =>
            prev.filter((p) => p._id.toString() !== prompt._id.toString())
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <Profile
      name={name || "My"}
      desc={`Welcome to ${name}'s personalized profile page`}
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
