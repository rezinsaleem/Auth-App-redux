import { Link } from "react-router-dom"

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-slate-700">SignUp</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" id="username" className="bg-slate-100 p-3 rounded-lg font-medium text-slate-700"/>
        <input type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg font-medium text-slate-700"/>
        <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg font-medium text-slate-700"/>
        <button className="p-2 bg-slate-700 font-medium text-white rounded-lg hover:opacity-95 disabled:opacity-80">SIGN UP</button>
      </form>
      <div className="flex gap-2 mt-4 justify-center ">
       <p className="text-slate-700">Have an account? </p>
       <Link to='/login'>
       <span className="text-blue-500">Sign In</span>
       </Link>
      </div>
    </div>
  )
}

export default SignUp