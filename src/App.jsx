import { LoadingScreen } from "./components/section/LoadingScreen";
import {  ToDoList  } from "./components/section/Home";
import "./index.css";
import { useState } from "react";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
  <>
    {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)}/>}{" "}
      <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"} bg-black text-gray-100`}>
          <ToDoList />
      </div>
  </>
  );
}

export default App;