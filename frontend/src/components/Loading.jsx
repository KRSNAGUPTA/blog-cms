import { LoaderIcon } from "lucide-react";
import React from "react";

function LoadingComponent() {
  return (
    <div className="flex flex-row  justify-center items-center w-screen h-screen">
      <div className="animate-spin"><LoaderIcon/></div>
      <span className="ml-3">Loading...</span>
    </div>
  );
}

export default LoadingComponent;
