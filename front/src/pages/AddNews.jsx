import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogschema } from "../schema/blogSchema";
import axios from "axios";

const AddEvent = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(blogschema),
  });

  const postData = async () => {
    const values = getValues();
    axios.post("http://localhost:3000/kindity/blog/news", {
      header: values.header,
      desc: values.desc,
      img: values.img,
      category1: values.category1,
      category2: values.category2,
      category3: values.category3,
      category4: values.category4,
      user: values.user
    });
  };

  return (
    <section>
      <div className="container">
        <div className="pt-[120px] pb-[200px]">
          <form
            className="flex flex-col w-[700px] border-2 rounded p-5 gap-5 mx-auto"
            onSubmit={handleSubmit(postData)}
          >
            <h2 className="text-center text-[50px] uppercase font-semibold tracking-widest mb-[20px]">
              Add News
            </h2>
            <div className="flex gap-[30px] justify-center">
            <div className="flex flex-col gap-[20px]">
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
              <label>Category 1:</label>
              <input
                className="border py-2 px-3"
                type="text"
                placeholder="Enter Category 1"
                {...register("category1")}
              />
              {errors.category1?.message && (
                <p className="text-red-500">{errors.category1?.message}</p>
              )}
            </div>
            </div>
            <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-3 justify-center">
              <label>Category 2:</label>
              <input
                className="border py-2 px-3"
                type="text"
                placeholder="Enter Category 2"
                {...register("category2")}
              />
              {errors.category2?.message && (
                <p className="text-red-500">{errors.category2?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <label>Category 3:</label>
              <input
                className="border py-2 px-3"
                type="text"
                placeholder="Enter Category 3"
                {...register("category3")}
              />
              {errors.category3?.message && (
                <p className="text-red-500">{errors.category3?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <label>Category 4:</label>
              <input
                className="border py-2 px-3"
                type="text"
                placeholder="Enter Category 4"
                {...register("category4")}
              />
              {errors.category4?.message && (
                <p className="text-red-500">{errors.category4?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <label>User:</label>
              <input
                className="border py-2 px-3"
                type="text"
                placeholder="Enter User"
                {...register("user")}
              />
              {errors.user?.message && (
                <p className="text-red-500">{errors.user?.message}</p>
              )}
            </div>
            </div>
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
