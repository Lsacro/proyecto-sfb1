import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/Users/LoginForm";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={() => <div>Home</div>} />{" "}
        {/* Define tu componente Home */}
      </Routes>
    </>
  );
};

export default App;
