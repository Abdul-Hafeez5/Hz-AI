import { Link, Outlet } from "react-router-dom";
import "./rootlayout.css";

const RootLayOut = () => {
  return (
    <div className="rootLayout">
      <header>
        <Link to="/">
          <img src="/logo.png" alt="logo" />
        </Link>
        <span>Hz AI</span>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayOut;
