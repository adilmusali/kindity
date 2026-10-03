import React from "react";

const StoryBody = ({ description }) => {
  if (typeof description !== "string" || !description.trim()) return null;

  return (
    <div className="space-y-4 text-sm font-light text-[#777777] leading-7">
      {description.trim().split(/\r?\n\s*\r?\n/).map((paragraph, index) => (
        <p className="whitespace-pre-line" key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

export default StoryBody;
