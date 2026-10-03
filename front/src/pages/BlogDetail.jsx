import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import BlogInfo from "../components/BlogInfo";
import StoryBody from "../components/Blog/StoryBody";
import StoryMeta from "../components/Blog/StoryMeta";

const BlogDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setStory(null);
    setError(false);

    axios.get(`${import.meta.env.VITE_API_URL}/api/news/${id}`)
      .then(({ data }) => { if (active) setStory(data); })
      .catch(() => { if (active) setError(true); });

    return () => { active = false; };
  }, [id]);

  if (error) {
    return (
      <main className="container py-24 text-center">
        <p className="mb-4">This story is unavailable.</p>
        <Link className="text-[#ea2c58] hover:underline" to="/blog">Browse stories</Link>
      </main>
    );
  }

  if (!story) return <div className="text-center py-40">Loading...</div>;

  return (
    <section className="bg-[#f9f9ff]">
      <Helmet>
        <title>{story.header} | Kindity</title>
      </Helmet>
      <div className="container flex flex-wrap lg:flex-nowrap gap-10 py-20">
        <article className="flex-1 min-w-0 bg-white">
          {story.img && <img className="w-full max-h-[460px] object-cover" src={story.img} alt="" />}
          <div className="p-6 sm:p-10 space-y-6">
            <h1 className="text-2xl sm:text-3xl font-semibold">{story.header}</h1>
            <StoryMeta story={story} />
            <StoryBody description={story.desc} />
          </div>
        </article>
        <BlogInfo />
      </div>
    </section>
  );
};

export default BlogDetail;
