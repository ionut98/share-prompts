"use client";

import { useCallback, useEffect, useState } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          // handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);

  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const fetchPosts = useCallback(async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPrompts(data);
  }, []);

  const handleTagClick = useCallback((tag) => {
    // Implement your logic to filter posts by tag here
    // Example: setPosts(posts.filter((post) => post.tags.includes(tag)));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tags or a username"
          value={searchText}
          onChange={handleChangeSearchText}
          required
          className="search_input peer"
        />
        {/* <button type="submit">Search</button> */}
      </form>

      <PromptCardList data={prompts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
