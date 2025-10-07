import React, { useState } from "react";
import axios from "axios";

const Images = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSrc, setModalSrc] = useState("");

  const showModal = (src) => {
    setModalVisible(true);
    setModalSrc(src);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderImages = () => {
    return data.slice(0, 12).map((item, index) => (
      <div key={index}>
        <img
          src={item.img}
          className="w-full h-full object-cover cursor-pointer"
          alt=""
          onClick={() => showModal(item.img)}
        />
      </div>
    ));
  };

  return (
    <section>
      <div className="container">
        <div className="py-[120px] text-center">
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-[30px]">
            <div className="flex flex-col gap-[30px]">{renderImages().slice(0, 4)}</div>
            <div className="flex flex-col gap-[30px]">{renderImages().slice(4, 8)}</div>
            <div className="flex flex-col gap-[30px]">{renderImages().slice(8, 12)}</div>
          </div>
          <div className="mt-[80px]">
            <button className="uppercase text-[14px] font-semibold border border-[#ea2c58] 
            px-[30px] py-2 text-white hover:text-[#ea2c58] bg-[#ea2c58] hover:bg-white transition duration-500">
              load more images
            </button>
          </div>
        </div>
      </div>
      {modalVisible && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="fixed inset-0 bg-black opacity-70" onClick={closeModal}></div>
          <div className="max-w-[800px] max-h-[600px] relative">
            <img className="w-full h-full object-cover" src={modalSrc} alt="" />
            <a
              className="absolute z-10 top-6 right-8 text-black text-5xl font-bold"
              href="javascript:void(0)"
              onClick={closeModal}
            >
              &times;
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Images;