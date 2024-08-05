import { Link } from "react-router-dom";
// import "./homePage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import useIsOnline from "../../hooks/useIsOnline";

const HomePage = () => {
  const [typingStatus, setTypingStatus] = useState("Human1");
  const isOnline = useIsOnline();
  if (!isOnline) return "It seems you are offline please try again later";
  return (
    <div className="homePage flex flex-col lg:flex-row items-center gap-0 lg:gap-24 h-full">
      <img
        src="/orbital.png"
        alt="image"
        className="orbital absolute bottom-0 left-0 opacity-5 z-[-1] animate-Rotate-Orbital"
      />
      <div className="left flex-1 flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-6xl xl:text-9xl bg-gradient-to-r from-blue-custom to-pink-custom bg-clip-text">
          HZ AI
        </h1>
        <h2>Your Productivity and Creativity Assistant </h2>
        <h3 className="font-normal max-w-full lg:max-w-[70%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut officiis,
          possimus eligendi repellendus inventore cum ducimus natus adipisci ex
          vel vero beatae molestias!
        </h3>
        <Link
          to="/dashboard"
          className="py-4 font-semibold px-6 bg-blue-custom text-white rounded-3xl text-sm mt-5 hover:bg-white hover:text-blue-custom "
        >
          Get Started
        </Link>
      </div>
      <div className="right flex-1 flex items-center justify-center h-full">
        <div className="imgContainer flex items-center justify-center bg-blue-dark rounded-[50px] h-1/2 w-[80%] relative ">
          <div className="bgContainer w-full h-full overflow-hidden rounded-[50px] absolute top-0 left-0">
            <div className="bg bg-[url('/bg.png')] opacity-20 w-[200%] h-full bg-auto animate-Slide-Bg"></div>
          </div>
          <img
            src="/bot.png"
            alt="bot"
            className="bot w-full h-full object-contain animate-Bot-Animate"
          />
          <div className="chat hidden absolute bottom-[-30px] right-[-50px] xl:right-0 lg:flex items-center gap-2 p-5 bg-primary-dark rounded-lg">
            <img
              className="w-8 h-8 rounded-[50%] object-cover"
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
      <div className="terms absolute bottom-5 left-12 transform -translate-x--1/2 flex flex-col items-center gap-5">
        <img src="/logo.png" alt="" className="w-4 h-4" />
        <div className="links flex gap-2 text-[10px] text-primary-extra-light">
          <Link to="/"> Terms of service</Link>
          <span>|</span>
          <Link to="/"> Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
