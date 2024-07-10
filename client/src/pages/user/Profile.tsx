import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store.ts";
const Profile = () => {
  const {currentUser} = useSelector((state:RootState) => state.user)

  if (!currentUser) {
    return <div>Loading...</div>; 
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-slate-700">Profile</h1>
    <form className='flex flex-col gap-4'>
      <img
        src={currentUser.profilePicture}
        alt='profile'
        className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
      />
      <input
        defaultValue={currentUser.username}
        type='text'
        id='username'
        placeholder='Username'
       className="bg-slate-200 p-3 rounded-lg font-medium text-slate-700"
      />
      <input
        defaultValue={currentUser.email}
        type='email'
        id='email'
        placeholder='Email'
       className="bg-slate-200 p-3 rounded-lg font-medium text-slate-700"
      />
      <input
        type='password'
        id='password'
        placeholder='Password'
        className="bg-slate-200 p-3 rounded-lg font-medium text-slate-700"
      />
      <button className='bg-slate-700 text-white p-2 rounded-lg uppercase font-medium hover:opacity-95 disabled:opacity-80 '>update</button>
    </form>
    <div className="flex justify-between mt-3 mx-2">
      <span className='text-red-700 cursor-pointer font-medium'>Delete Account</span>
      <span className='text-red-700 cursor-pointer font-medium'>Sign out</span>
    </div>
  </div>
);
}

export default Profile