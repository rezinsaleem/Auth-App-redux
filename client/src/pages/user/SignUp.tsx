import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SignUp = () => {

  const [formData,setFormData] = useState({}) 
  const [loading, setLoading] = useState(false);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement> ) =>{
    setFormData({...formData,[e.target.id]:e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data); 
      toast.success('User created successfully!');
      setLoading(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-slate-700">
        Sign Up
      </h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg font-medium text-slate-700" onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg font-medium text-slate-700" onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg font-medium text-slate-700" onChange={handleChange}
        />
        <button disabled={loading} className="p-2 bg-slate-700 font-medium text-white rounded-lg hover:opacity-95 disabled:opacity-80">
        {loading ? 'Loading...' : 'SIGN UP'}
        </button>
      </form>
      <div className="flex gap-2 mt-4 justify-center ">
        <p className="text-slate-700">Have an account? </p>
        <Link to="/login">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
