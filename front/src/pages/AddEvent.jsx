import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schema/schema";
import axios from "axios";

const AddEvent = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postData = async () => {
    const values = getValues();
    axios.post("http://localhost:3000/kindity/home/events", {
      img: values.img,
      header: values.header,
      desc: values.desc,
    });
  };

  return (
    <section>
      <div className="container">
        <div className="pt-[120px] pb-[200px]">
          <form
            className="flex flex-col w-[500px] border-2 rounded p-5 gap-5 mx-auto"
            onSubmit={handleSubmit(postData)}
          >
            <h2 className="text-center text-[50px] uppercase font-semibold tracking-widest mb-[20px]">
              Add Event
            </h2>
            <div className="flex flex-col gap-3 justify-center">
              <label>Image Source:</label>
              <input
                className="border py-2 px-3"
                type="text"
                placeholder="Enter Image Source"
                {...register("img")}
              />
              {errors.img?.message && (
                <p className="text-red-500">{errors.img?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <label>Header:</label>
              <input
                className="border py-2 px-3"
                type="text"
                placeholder="Enter Header"
                {...register("header")}
              />
              {errors.header?.message && (
                <p className="text-red-500">{errors.header?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <label>Description:</label>
              <input
                className="border py-2 px-3"
                type="text"
                placeholder="Enter Description"
                {...register("desc")}
              />
              {errors.desc?.message && (
                <p className="text-red-500">{errors.desc?.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="px-5 py-2 text-white bg-[#ea2c58] 
            hover:bg-white hover:text-slate-500 border border-[#ea2c58] transition duration-500 mt-[20px]"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddEvent;
