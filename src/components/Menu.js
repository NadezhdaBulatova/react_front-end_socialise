import { useAuth } from "../utils/hooks/useAuth";

const Menu = () => {
  const { logoutUser } = useAuth();
  const menuList = [
    {
      header: "Home",
      link: "/",
    },
    {
      header: "Translate",
      link: "/translate",
    },
    {
      header: "Travel history",
      link: "/travel",
    },
  ];
  return (
    <div className="navbar bg-base-100 rounded-lg shadow-xl h-full z-10">
      <div className="navbar-start lg:w-1/4">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <MenuList
            list={menuList}
            listStyle="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            itemStyle=""
            linkStyle=""
          />
        </div>
        <a className="btn btn-ghost normal-case text-xl">Socialize</a>
      </div>
      <div className="hidden lg:flex w-full">
        <MenuList
          list={menuList}
          listStyle="menu menu-horizontal px-1 w-full"
          itemStyle="flex-1 items-center justify-center"
          linkStyle="flex-1 justify-center"
        />
      </div>
      <div className="navbar-end lg:w-1/4">
        <button className="btn btn-accent" onClick={() => logoutUser()}>
          Logout
        </button>
      </div>
    </div>
  );
};

const MenuList = ({ list, listStyle, itemStyle, linkStyle }) => {
  return (
    <ul className={listStyle}>
      {list.map((item, index) => {
        return (
          <li className={itemStyle} key={index}>
            <a className={linkStyle} href={item.link}>
              {item.header}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
