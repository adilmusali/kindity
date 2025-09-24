import axios from "axios";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "../schema/userSchema"; // Import our new schema

export const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const handleRegistration = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/register", data);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Account Created Successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="py-[120px]">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Register</title>
        </Helmet>
        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="flex flex-col w-[500px] border-2 rounded p-5 gap-4 mx-auto"
        >
          <h2 className="text-center text-3xl font-semibold mb-4">Create Account</h2>

          <div className="flex flex-col gap-1">
            <label>Name</label>
            <input
              className="border py-2 px-3"
              type="text"
              placeholder="Enter Name..."
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              className="border py-2 px-3"
              type="email"
              placeholder="Enter Email..."
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label>Password</label>
            <input
              className="border py-2 px-3"
              type="password"
              placeholder="Enter Password..."
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 text-white bg-[#ea2c58] disabled:bg-red-300
            hover:bg-white hover:text-slate-500 border border-[#ea2c58] transition duration-500 mt-[20px]"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};