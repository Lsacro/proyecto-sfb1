import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/Users/LoginForm";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={() => <div>Home</div>} />{" "}
        {/* Define tu componente Home */}
      </Routes>
    </>
  );
};

export default App;
