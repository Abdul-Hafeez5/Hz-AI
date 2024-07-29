import { Outlet } from "react-router-dom";
import "./dasboardLayout.css";
const DasboardLayout = () => {
  return (
    <div className="dasboardLayout">
      <div className="menu">Menu</div>
      <div className="content"><Outlet/></div>
    </div>
  );
};

export default DasboardLayout;
