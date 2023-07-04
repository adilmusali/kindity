import React from "react";
import Telescope from "../components/Blog/Telescope";
import GeneralCategories from "../components/Blog/GeneralCategories";
import MainBlog from "../components/Blog/MainBlog";
import { Helmet } from "react-helmet";

const Blog = () => {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Blog</title>
    </Helmet>
      <Telescope />
      <GeneralCategories />
      <MainBlog />
    </>
  );
};

export default Blog;
