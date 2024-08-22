// import { SignUp } from "@clerk/clerk-react";
// const SignUpPage = () => {
//   return (
//     <div className="h-full flex items-center justify-center">
//       <SignUp path="/sign-up" signInUrl="/sign-in" />
//     </div>
//   );
// };

// export default SignUpPage;

import { useContext, useState } from "react";
import AuthContext from "../context/authContext";

const SignUpPage = () => {
  const [formData, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { signUp } = useContext(AuthContext);
  const { username, email, password } = formData;

  const handleOnchange = (e) => {
    setFormdata({ ...formData, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(username, email, password);
      console.log("signUp successful");
    } catch (error) {
      console.error("signUp error", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={username}
        placeholder="enter username"
        onChange={handleOnchange}
      />
      <input
        type="email"
        name="email"
        value={email}
        placeholder="enter email"
        onChange={handleOnchange}
      />
      <input
        type="password"
        name="password"
        value={password}
        placeholder="enter Password"
        onChange={handleOnchange}
      />
      <button type="submit">SingUp</button>
    </form>
  );
};
export default SignUpPage;
