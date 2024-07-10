import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { RootState } from "../redux/store.ts";

export default function PrivateRoute() {
    const {currentUser} = useSelector((state:RootState) => state.user)
  return currentUser ? <Outlet/> : <Navigate to='/login'/>
}