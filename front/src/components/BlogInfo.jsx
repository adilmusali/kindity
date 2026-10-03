import React from "react";
import { Link } from "react-router-dom";
import { siteCopy } from "../content/siteCopy";

const BlogInfo = () => (
  <aside className="w-full lg:w-[320px] shrink-0" aria-label="About these stories">
    <div className="border bg-white p-7 space-y-5">
      <h2 className="text-xl font-semibold">About these stories</h2>
      <p className="text-sm text-[#777777] leading-6">{siteCopy.blogIntroduction}</p>
      <p className="text-sm text-[#777777] leading-6">Stories marked “{siteCopy.demoLabel}” are examples. {siteCopy.demoExplanation}</p>
      <div className="flex flex-col gap-3 text-sm">
        <Link to="/about" className="text-[#ea2c58] hover:underline">About Kindity</Link>
        <Link to="/event" className="text-[#ea2c58] hover:underline">Community events</Link>
      </div>
    </div>
  </aside>
);

export default BlogInfo;
