import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogInfo from "../BlogInfo";
import StoryBody from "./StoryBody";
import StoryMeta from "./StoryMeta";
import { UserContext } from "../../../context/userContext";

const MainBlog = ({ data }) => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState(data ?? []);

  useEffect(() => setPosts(data ?? []), [data]);

  const deleteStory = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/news/${id}`);
      setPosts((current) => current.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Failed to delete story", error);
    }
  };

  return (
    <section className="bg-[#f9f9ff]">
      <div className="container">
        <div className="flex flex-wrap lg:flex-nowrap gap-10 py-20">
          <div className="flex-1 min-w-0 space-y-12">
            {posts.length === 0 && <p className="text-[#777777]">No stories are available yet.</p>}
            {posts.map((story) => (
              <article className="bg-white" key={story._id}>
                {story.img && <img className="w-full max-h-[400px] object-cover" src={story.img} alt="" />}
                <div className="p-6 sm:p-8 space-y-5">
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    <Link to={`/blog/${story._id}`} className="hover:text-[#ea2c58]">{story.header}</Link>
                  </h2>
                  <StoryMeta story={story} />
                  <StoryBody description={story.desc} />
                  <div className="flex flex-wrap items-center gap-4">
                    <Link to={`/blog/${story._id}`} className="inline-block bg-[#ea2c58] text-white text-sm font-medium px-6 py-2 hover:bg-[#b91d45]">Read story</Link>
                    {user?.role === "admin" && (
                      <button type="button" onClick={() => deleteStory(story._id)} className="text-sm border px-5 py-2 hover:border-[#ea2c58]">Delete</button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <BlogInfo />
        </div>
      </div>
    </section>
  );
};

export default MainBlog;
