import Navbar from "./Navbar";

interface props {
  children: React.ReactNode;
}

const MainPage = ({ children }: props): JSX.Element => {
  return (
    <div className="overflow-x-hidden max-w-full grid grid-cols-page-layout w-full h-screen">
      <Navbar />
      <div className="w-full bg-white pr-12 pl-4 pt-12">{children}</div>
    </div>
  );
};

export default MainPage;
