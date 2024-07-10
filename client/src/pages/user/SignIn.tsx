import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart,signInSuccess } from "../../redux/user/userSlice.ts";
import { RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading}= useSelector((state:RootState)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await axios.post("/api/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      }); 
      dispatch(signInSuccess(res.data))
      console.log(res.data);
      toast.success("LoggedIn successfully!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
     dispatch(signInFailure())
      toast.error(`wrong credentials`);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-slate-700">
        Sign In
      </h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-200 p-3 rounded-lg font-medium text-slate-700"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-200 p-3 rounded-lg font-medium text-slate-700"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="p-2 bg-slate-700 font-medium text-white rounded-lg hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "SIGN IN"}
        </button>
      </form>
      <div className="flex gap-2 mt-4 justify-center ">
        <p className="text-slate-700">Don't have an account? </p>
        <Link to="/signup">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
