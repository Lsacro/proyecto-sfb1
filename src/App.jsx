import { Route, Routes } from "react-router-dom";
import FavouritesPage from "./pages/FavouritesPage";
import HomePage from "./pages/HomePage";
import MyFlatsPage from "./pages/MyFlatsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import PrivateRoute from "./components/Commons/PrivateRoute";
import NewFlatPage from "./pages/NewFlatPage";
import EditFlatPage from "./pages/EditFlatPage";
import FlatDetailsPage from "./pages/FlatDetailsPage";
import MessageList from "./components/Messages/MessageList";

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
          <Route path="UpdateProfilePage" element={<UpdateProfilePage />} />
          <Route path="newflat" element={<NewFlatPage />} />
          <Route path="editflat" element={<EditFlatPage />} />
          <Route path="flatdetails" element={<FlatDetailsPage />} />
          <Route path="/edit-flat/:id" element={<EditFlatPage />} />
          <Route path="flat-details/:id" element={<FlatDetailsPage />} />{" "}
          {/* Ruta para ver detalles del flat */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
