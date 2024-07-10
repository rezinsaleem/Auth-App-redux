import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className="bg-slate-700">
     <div className="flex justify-between items-center max-w-6xl mx-auto p-3 text-white">
      <Link to='/'>
      <h1 className='font-bold'>Auth App</h1>
      </Link>
      <ul className='flex gap-4 font-medium'>
         <Link to='/'><li>Home</li></Link>
         <Link to='/login'><li>SignIn</li></Link>
      </ul>
     </div>
    </div>
  )
}

export default Header