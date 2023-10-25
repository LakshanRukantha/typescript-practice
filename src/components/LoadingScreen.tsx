import { ImSpinner8 } from "react-icons/im";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-3 min-h-container-with-footer">
      <ImSpinner8 className="animate-spin text-violet-500 h-6 w-6 md:h-8 md:w-8" />
      <span className="animate-pulse">Loading Please Wait...</span>
    </div>
  );
};

export default LoadingScreen;
