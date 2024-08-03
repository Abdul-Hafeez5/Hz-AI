import { Link } from "react-router-dom";
import "./homePage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import useIsOnline from "../../hooks/useIsOnline";

const HomePage = () => {
  const [typingStatus, setTypingStatus] = useState("Human1");
  const isOnline = useIsOnline();
  if (!isOnline) return "It seems you are offline please try again later";
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
          <div className="chat">
            <img
              src={
                typingStatus === "Human1"
                  ? "/human1.jpeg"
                  : typingStatus === "Human2"
                  ? "/human2.jpeg"
                  : "/bot.png"
              }
              alt="animatedImg"
            />
            <TypeAnimation
              sequence={[
                "Human:We produce food for Mice",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: We produce food for Hamsters",
                2000,
                () => {
                  setTypingStatus("Human2");
                },
                "Human2: We produce food for Guinea Pigs",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: We produce food for Chinchillas",
                2000,
                () => {
                  setTypingStatus("Human1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to="/"> Terms of service</Link>
          <span>|</span>
          <Link to="/"> Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
