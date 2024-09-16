import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import useIsOnline from "../hooks/useIsOnline";

const HomePage = () => {
  const [typingStatus, setTypingStatus] = useState("Human1");
  const isOnline = useIsOnline();
  if (!isOnline) return "It seems you are offline please try again later";
  return (
    <div className=" relative flex flex-col items-center lg:gap-x-24 h-full">
      <img
        src="/orbital.png"
        alt="image"
        className=" absolute bottom-0 left-0 opacity-5 -z-10 animate-Rotate-Orbital"
      />
      <div className="flex flex-col lg:flex-row items-center lg:gap-x-24 h-full">
        <div className=" flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-6xl xl:text-9xl bg-gradient-to-r from-blue-custom to-pink-custom bg-clip-text">
            HZ AI
          </h1>
          <h2>Your Productivity and Creativity Assistant </h2>
          <h3 className="font-normal max-w-full lg:max-w-[70%]">
            A personal AI assistant is like having a 24/7 companion, always
            learning, always adapting, and always there to help you succeed
          </h3>
          <Link
            to="/dashboard"
            className="py-4 font-semibold px-6 bg-blue-custom text-white rounded-3xl text-sm mt-5 hover:bg-gray-300 hover:text-blue-custom "
          >
            Get Started
          </Link>
        </div>
        <div className=" flex-1 flex items-center justify-center h-full">
          <div className=" flex items-center justify-center bg-blue-dark rounded-3xl h-1/2 w-[80%] relative ">
            <div className=" w-full h-full overflow-hidden rounded-[50px] absolute top-0 left-0">
              <div className=" bg-[url('/bg.png')] opacity-20 w-[200%] h-full bg-auto animate-Slide-Bg"></div>
            </div>
            <img
              src="/bot.png"
              alt="bot"
              className=" w-full h-full p-3 sm:p-0 lg:w-full lg:h-full object-contain animate-Bot-Animate"
            />
            <div className=" hidden absolute bottom-[-30px] right-[-50px] xl:right-0 lg:flex items-center gap-2 p-5 bg-primary-dark rounded-lg">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={
                  typingStatus === "Ahmed"
                    ? "/human1.jpeg"
                    : typingStatus === "Hina"
                    ? "/human2.jpeg"
                    : "/bot.png"
                }
                alt="animatedImg"
              />
              <TypeAnimation
                sequence={[
                  "Ahmed:We produce food for Mice",
                  2000,
                  () => {
                    setTypingStatus("bot");
                  },
                  "Bot: We produce food for Hamsters",
                  2000,
                  () => {
                    setTypingStatus("Hina");
                  },
                  "Hina: We produce food for Guinea Pigs",
                  2000,
                  () => {
                    setTypingStatus("bot");
                  },
                  "Bot: We produce food for Chinchillas",
                  2000,
                  () => {
                    setTypingStatus("Ahmed");
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
      </div>
      <div className=" flex flex-col items-center justify-center  gap-5">
        <img src="/logo.png" alt="" className="w-4 h-4" />
        <div className=" flex gap-2  text-[10px] text-primary-extra-light">
          <Link to="/"> Terms of service</Link>
          <span>|</span>
          <Link to="/"> Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
