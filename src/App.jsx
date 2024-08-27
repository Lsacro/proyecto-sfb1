import { Route, Routes } from "react-router-dom";
import FavouritesPage from "./pages/FavouritesPage";
import HomePage from "./pages/HomePage";
import MyFlatsPage from "./pages/MyFlatsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import PrivateRoute from "./components/Commons/PrivateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="my-flats" element={<MyFlatsPage />} />
          <Route path="my-profile" element={<ProfilePage />} />
          <Route path="UpdateProfilePage" element={<UpdateProfilePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
