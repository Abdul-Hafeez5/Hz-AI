import { useRef } from "react";
import "./chatPage.css";
import { useEffect } from "react";
const ChatPage = () => {
  const lastRef = useRef(null);

  useEffect(() => {
    lastRef.current.scrollIntoView({ behaviour: "smooth" });
  }, []);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message">Test message from AI</div>
          <div className="message user">
            test message from user Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Facilis ratione numquam cumque, eligendi totam
            iure obcaecati aliquid quos natus, nobis officiis laborum? Ex, modi!
            Ab obcaecati quas delectus distinctio qui numquam, consequatur eaque
            ea?
          </div>
          <div className="message">Test message from AI</div>
          <div className="message user"> test message from user</div>
          <div className="message">Test message from AI</div>
          <div className="message user"> test message from user</div>
          <div className="message">Test message from AI</div>
          <div className="message user"> test message from user</div>
          <div className="message">Test message from AI</div>
          <div className="message user"> test message from user</div>
          <div className="message">Test message from AI</div>
          <div className="message user"> test message from user</div>
          <div className="message">Test message from AI</div>
          <div className="message user"> test message from user</div>
          <div className="message">Test message from AI</div>
          <div className="message user"> test message from user</div>
          <div ref={lastRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
