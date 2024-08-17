import { Route, Routes } from "react-router-dom";
import FavouritesPage from "./pages/FavouritesPage";
import HomePage from "./pages/HomePage";
import MyFlatsPage from "./pages/MyFlatsPage";
import ProfilePage from "./pages/ProfilePage";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="my-flats" element={<MyFlatsPage />} />
        <Route path="my-profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;
