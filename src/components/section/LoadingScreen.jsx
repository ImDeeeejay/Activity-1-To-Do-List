import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const [subText, setSubText] = useState("");  
  const fullText = "Grow a Coders";
  const fullSubText = "To-Do-List";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);
        let subIndex = 0;
        const subInterval = setInterval(() => {
          setSubText(fullSubText.substring(0, subIndex));
          subIndex++;
          if (subIndex > fullSubText.length) {
            clearInterval(subInterval);
            setTimeout(() => {
              onComplete();
            }, 1000);
          }
        }, 100);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black text-gray-100 flex flex-col items-center justify-center">
      <div className="mb-2 text-4xl font-mono font-bold">
        | {text}
        <span className="animate-blink ml-1">|</span>
      </div>

      <div className="mb-6 text-3xl font-mono font-semibold text-white">
        {subText}
        {subText.length < fullSubText.length && (
          <span className="animate-blink ml-1">|</span>
        )}
      </div>

      <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
      </div>
    </div>
  );
};
