import { ScaleLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <ScaleLoader height={300} radius={50} width={15} color="#5046e5" />
    </div>
  );
};

export default LoadingSpinner;
