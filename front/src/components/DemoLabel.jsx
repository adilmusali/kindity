import React from "react";
import { siteCopy } from "../content/siteCopy";

const DemoLabel = ({ kind = "story", className = "" }) => {
  const label = kind === "figures" ? siteCopy.sampleFiguresLabel : siteCopy.demoLabel;

  return (
    <p className={`text-sm text-slate-500 ${className}`} role="note">
      <strong className="font-semibold">{label}.</strong> {siteCopy.demoExplanation}
    </p>
  );
};

export default DemoLabel;
