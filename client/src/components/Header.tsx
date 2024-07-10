import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <div className="bg-slate-700">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 text-white">
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-4 font-medium">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/profile">
          {currentUser?(
          <img src={currentUser.profilePicture} alt="profile" className="w-7 h-7 rounded-full object-cover" />
          ):(
          <li>SignIn</li>
          )}
            
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
