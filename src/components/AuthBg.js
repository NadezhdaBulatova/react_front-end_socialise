import bgImg from "../assets/imgs/people.jpg";
const AuthBg = ({ children }) => {
  return (
    <div className="relative max-w-screen min-h-screen flex flex-row  bg-slate-600">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={bgImg}
        alt=""
      />

      {children}
    </div>
  );
};

export default AuthBg;
