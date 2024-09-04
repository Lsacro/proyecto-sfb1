import { Route, Routes } from "react-router-dom";
import FavouritesPage from "./pages/FavouritesPage";
import HomePage from "./pages/HomePage";
import MyFlatsPage from "./pages/MyFlatsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/Commons/PrivateRoute";
import NewFlatPage from "./pages/NewFlatPage";
import EditFlatPage from "./pages/EditFlatPage";
import FlatDetailsPage from "./pages/FlatDetailsPage";
import AllUsersPage from "./pages/AllUsersPage";
import EditUserPage from "./pages/UpdateProfilePage";

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
          <Route path="myprofile" element={<ProfilePage />} />
          <Route path="newflat" element={<NewFlatPage />} />
          <Route path="edit-flat/:id" element={<EditFlatPage />} />
          <Route path="flat/:id" element={<FlatDetailsPage />} />
          <Route path="/allusers" element={<AllUsersPage />} />
          <Route path="/edit-user/:id" element={<EditUserPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
