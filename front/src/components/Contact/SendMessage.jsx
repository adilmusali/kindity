import React from "react";
import { siteCopy } from "../../content/siteCopy";

const SendMessage = () => (
  <section>
    <div className="container">
      <div className="py-[100px] max-w-3xl mx-auto text-center">
        <h2 className="text-[24px] sm:text-[30px] font-semibold mb-4">Contact information</h2>
        <p className="text-[14px] sm:text-base text-[#777777] font-light leading-7">{siteCopy.contactNotice}</p>
      </div>
    </div>
  </section>
);

export default SendMessage;
