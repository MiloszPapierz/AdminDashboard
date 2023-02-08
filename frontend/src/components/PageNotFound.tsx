import { Link } from "react-router-dom";

const PageNotFound = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-h-screen flex items-center justify-center">
      <div className="bg-light-grey rounded-md px-3 xsm:px-10 shadow-lg h-96">
        <div className="flex flex-col h-full">
          <h1 className="text-sky-blue text-xl xsm:text-2xl md:text-3xl font-bold text-center">
            Page not found
          </h1>
          <Link
            to="/dashboard"
            className="pt-8 mx-auto font-bold text-dark-green underline"
          >
            Go to dashboard page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
