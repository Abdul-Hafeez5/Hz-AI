// import { SignIn } from "@clerk/clerk-react";
// const SignInPage = () => {
//   return (
//     <div className="h-full flex items-center justify-center">
//       <SignIn
//         path="/sign-in"
//         signUpUrl="/sign-up"
//         forceRedirectUrl="/dashboard"
//       />
//     </div>
//   );
// };
import { useState, useContext } from "react";
import AuthContext from "../context/authContext";
const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log("login successful");
    } catch (error) {
      console.error("login error", error);
    }
  };

  return (
    <form onClick={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default SignInPage;
