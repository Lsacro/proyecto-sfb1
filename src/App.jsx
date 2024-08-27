import { Route, Routes } from "react-router-dom";
import FavouritesPage from "./pages/FavouritesPage";
import HomePage from "./pages/HomePage";
import MyFlatsPage from "./pages/MyFlatsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import NewFlatPage from "./pages/NewFlatPage";
import EditFlatPage from "./pages/EditFlatPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="my-flats" element={<MyFlatsPage />} />
        <Route path="my-profile" element={<ProfilePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="UpdateProfilePage" element={<UpdateProfilePage />} />
        <Route path="newflat" element={<NewFlatPage />} />
        <Route path="editflat" element={<EditFlatPage />} />
      </Routes>
    </>
  );
};

export default App;
