import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import Profile from "./pages/user/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteSign from "./components/PrivateRouteSign";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PrivateRouteSign component={SignIn} />} />
        <Route path="/signup" element={<PrivateRouteSign component={SignUp} />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
