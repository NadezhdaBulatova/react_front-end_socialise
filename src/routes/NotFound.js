import AuthBg from "../components/AuthBg";
import Menu from "../components/Menu";

const NotFound = () => {
  return (
    <AuthBg>
      <div className="flex-1 my-3 rounded-lg p-3 flex flex-col border-2 border-slate-600 justify-center items-center">
        <h1 className="text-3xl text-white">
          {
            "Oops, the page is not found \n Please use the menu to navigate to other pages "
          }
        </h1>
      </div>
      <Menu />
    </AuthBg>
  );
};

export default NotFound;
