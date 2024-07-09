import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className="bg-blue-200">
     <div className="flex justify-between items-center max-w-6xl mx-auto p-3 text-slate-700">
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