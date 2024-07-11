import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, 'Username should be at least 3 characters')
      .required('Username is required'),
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
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await axios.post("/api/auth/signup", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res.data);
        toast.success("User created successfully!");
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.error("Error submitting form:", error);
        setLoading(false);
        toast.error("Something went wrong!");
      }
    },
  });

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-slate-700">
        Sign Up
      </h1>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          name="username"
          className="bg-slate-200 p-3 rounded-lg font-medium text-slate-700"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          required
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-500 text-sm">{formik.errors.username}</div>
        ) : null}
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
          {loading ? "Loading..." : "SIGN UP"}
        </button>
      </form>
      <div className="flex gap-2 mt-4 justify-center ">
        <p className="text-slate-700">Have an account? </p>
        <Link to="/login">
          <span className="text-blue-500 font-medium">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
