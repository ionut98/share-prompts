"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState({
    prompt: "",
    tag: "",
  });

  const getPromptDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/prompt/${promptId}`);
      if (response.ok) {
        const data = await response.json();

        setPrompt({
          prompt: data.prompt,
          tag: data.tag,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updatePrompt = useCallback(
    async (ev) => {
      ev.preventDefault();
      setSubmitting(true);

      if (!promptId) {
        return alert("Prompt ID not found");
      }

      try {
        const response = await fetch(`/api/prompt/${promptId}`, {
          method: "PATCH",
          body: JSON.stringify({
            ...prompt,
          }),
        });

        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
    [prompt, router]
  );

  useEffect(() => {
    if (promptId) {
      getPromptDetails();
    }
  }, [getPromptDetails, promptId]);

  return (
    <Form
      type="Edit"
      post={prompt}
      setPost={setPrompt}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
