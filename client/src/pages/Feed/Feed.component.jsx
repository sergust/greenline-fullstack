import React from "react";
import Post from "../../components/Post/Post.component";
import logoMedia from "../../assets/logo.png";
import ecoPanda from "../../assets/ecopanda.jpg";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.component";

const posts = [
  {
    user: "Cameron",
    date: "6 June 2021",
    media: ecoPanda,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\n" +
      "        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim\n" +
      "        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n" +
      "        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate\n" +
      "        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint\n" +
      "        occaecat cupidatat non proident, sunt in culpa qui officia deserunt\n" +
      "        mollit anim id est laborum.",
  },
  {
    user: "Jack",
    date: "9 June 2021",
    media: logoMedia,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\n" +
      "        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim\n" +
      "        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n" +
      "        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate\n" +
      "        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint\n" +
      "        occaecat cupidatat non proident, sunt in culpa qui officia deserunt\n" +
      "        mollit anim id est laborum.",
  },
  {
    user: "Melisa",
    date: "14 June 2021",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\n" +
      "        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim\n" +
      "        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n" +
      "        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate\n" +
      "        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint\n" +
      "        occaecat cupidatat non proident, sunt in culpa qui officia deserunt\n" +
      "        mollit anim id est laborum.",
  },
];

const Feed = () => (
  <div>
    {posts.map((post, index) => {
      return <Post {...post} key={index} />;
    })}
    <LoadMoreBtn />
  </div>
);

export default Feed;
