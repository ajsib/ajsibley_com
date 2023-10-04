import React, { useState } from 'react';

const MockPage = () => {
  // Initialize a state variable for the content
  const [content, setContent] = useState("This is the initial content.");

  // Function to change the content
  const changeContent = () => {
    setContent("New content has been loaded!");
  };

  return (
    <div>
      <h1>Welcome to Mock Page</h1>
      <p>{content}</p>
      <button onClick={changeContent}>Change Content</button>
    </div>
  );
};

export default MockPage;
