import React from "react";
import DemoLabel from "../DemoLabel";
import { formatAddedDate } from "../../utils/contentFormatters";

const StoryMeta = ({ story }) => {
  const addedDate = formatAddedDate(story.createdAt);

  return (
    <div className="flex flex-col gap-2 text-sm text-[#777777]">
      {story.user && <span>By {story.user}</span>}
      {addedDate && <span>Added {addedDate}</span>}
      {story.isDemo === true && <DemoLabel />}
    </div>
  );
};

export default StoryMeta;
