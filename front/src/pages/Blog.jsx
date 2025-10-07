import React, { useState, useEffect } from "react";
import axios from "axios";
import Telescope from "../components/Blog/Telescope";
import GeneralCategories from "../components/Blog/GeneralCategories";
import MainBlog from "../components/Blog/MainBlog";
import { Helmet } from "react-helmet";

const Blog = () => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog`);
        setBlogData(data);
      } catch (error) {
        console.error("Failed to fetch blog page data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, []);

  if (loading || !blogData) {
    return <div className="text-center py-40">Loading...</div>;
  }

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Blog</title>
    </Helmet>
      <Telescope />
      <GeneralCategories data={blogData.options}/>
      <MainBlog data={blogData.news}/>
    </>
  );
};

export default Blog;
