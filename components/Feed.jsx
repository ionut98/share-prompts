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
          handleTagClick={handleTagClick}
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

  const fetchPrompts = useCallback(async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPrompts(data);
  }, []);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  const handleTagClick = useCallback((ev) => {
    const tag = ev.target.innerHTML;
    setSearchText(tag);
  }, []);

  const filterCallback = useCallback(
    (prompt) => {
      const searchedText = searchText.toLowerCase();

      return (
        prompt.prompt.toLowerCase().includes(searchedText) ||
        prompt.creator.username.toLowerCase().includes(searchedText) ||
        prompt.tag.toLowerCase().includes(searchedText)
      );
    },
    [searchText]
  );

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
      </form>

      <PromptCardList
        data={prompts.filter(filterCallback)}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
