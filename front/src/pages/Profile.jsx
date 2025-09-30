import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';
import { profileSchema } from '../schema/userSchema';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    }
  });

  const handleProfileUpdate = async (data) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/profile`, data);
      setUser(response.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container py-[120px]">
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(handleProfileUpdate)}
        className="flex flex-col w-[500px] border-2 rounded p-5 gap-4 mx-auto"
      >
        <h2 className="text-center text-3xl font-semibold mb-4">My Profile</h2>

        <div className="flex flex-col gap-1">
          <label>Name</label>
          <input
            className="border py-2 px-3"
            type="text"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            className="border py-2 px-3"
            type="email"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2 text-white bg-[#ea2c58] disabled:bg-red-300
          hover:bg-white hover:text-slate-500 border border-[#ea2c58] transition duration-500 mt-[20px]"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;