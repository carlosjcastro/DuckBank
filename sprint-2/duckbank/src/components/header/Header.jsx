import logo from "../../assets/img/LogoDuckBank2.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="mb-4 h-20 w-full flex items-center fixed bg-[#463f3a] z-10">
      <div className="ml-4">
        <Link to="/">
          <img
            className="w-auto h-12 bg-gradient-to-tr"
            src={logo}
            alt="Logo DuckBank"
          />
        </Link>
      </div>
      <div className="flex">
        <h1 className="text-center ml-2 font-semibold text-2xl text-[#f3c677]">
          DuckBank
        </h1>
      </div>
    </div>
  );
};

export default Header;
