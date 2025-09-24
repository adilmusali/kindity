import axios from "axios";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schema/userSchema";
import { UserContext } from "../../context/userContext"; 

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/login", data);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Login successful!");
        setUser(response.data.user); 
        navigate("/"); 
      }
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="py-[120px]">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login</title>
        </Helmet>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col w-[500px] border-2 rounded p-5 gap-4 mx-auto"
        >
          <h2 className="text-center text-3xl font-semibold mb-4">Login</h2>

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
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="flex mt-[10px]">
            <p className="text-[14px] text-slate-500 font-light leading-relaxed pr-[10px]">
              Don't you have an account?
            </p>
            <Link to={"/register"}>
              <p className="text-[14px] text-[#ea2c58] font-light leading-relaxed">
                Register
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};