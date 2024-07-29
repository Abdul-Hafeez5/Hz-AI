import { Link } from "react-router-dom";
import "./homePage.css";
const HomePage = () => {
  return (
    <div className="homePage">
      <img src="/orbital.png" alt="image" className="orbital" />
      <div className="left">
        <h1>HZ AI</h1>
        <h2>Your Productivity and Creativity Assistant </h2>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut officiis,
          possimus eligendi repellendus inventore cum ducimus natus adipisci ex
          vel vero beatae molestias!
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
            <img src="/bot.png" alt="bot" className="bot" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
