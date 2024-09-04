import UserForm from "../components/Users/UserForm";
import { getToken } from "../services/authService";
import { valdiateEmail } from "../services/firebase";

function UpdateProfilePage() {
  //vamos a traer la info del usuario
  const tokenLocalStorage = getToken();
  const userData = valdiateEmail(tokenLocalStorage);
  return (
    <div>
      <UserForm
        isUpdate={true}
        email={userData.email}
        firstName={userData.firstName}
        lastName={userData.lastName}
      />
    </div>
  );
}

export default UpdateProfilePage;
