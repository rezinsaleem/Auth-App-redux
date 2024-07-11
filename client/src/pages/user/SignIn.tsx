import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";
import { RootState } from '../../redux/store';

const SignIn = () => {
  const { loading, currentUser } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password should be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(signInStart());
        const res = await axios.post("/api/auth/signin", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(signInSuccess(res.data));
        toast.success("Logged in successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
        dispatch(signInFailure());
        toast.error(`Wrong credentials or user doesn't exist`);
      }
    },
  });

  useEffect(() => {
    if (currentUser) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentUser, navigate]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-slate-700">
        Sign In
      </h1>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          className="bg-slate-200 p-3 rounded-lg font-medium text-slate-700"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          required
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          className="bg-slate-200 p-3 rounded-lg font-medium text-slate-700"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          required
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
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
          <span className="text-blue-500 font-medium">Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
