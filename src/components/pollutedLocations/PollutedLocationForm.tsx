import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const PollutedLocationForm = () => {
  const content = () => {
    return (
      <div className="flex justify-center items-center h-5/6">
        <div className="flex flex-col items-center text-slate-600 text-sm">
          <div className="text-xl">
            <MdErrorOutline />
          </div>
          <div>The form should be here</div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full md:w-96 md:flex-none h-screen">
      {content()}
      <hr />
      <div className="p-2 w-full h-1/6">
        <div className="p-2 flex w-full justify-center">
          <button className="p-1 w-full bg-green-200 hover:bg-green-300 text-black font-semibold py-2 px-4 border rounded">
            Submit
          </button>
        </div>
        <div className="p-2 flex w-full justify-center">
          <Link to={"/"} className="p-1 w-full">
            <button className="p-1 w-full bg-transparent hover:bg-slate-200 text-black font-semibold py-2 px-4 border rounded">
              Go back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PollutedLocationForm;
