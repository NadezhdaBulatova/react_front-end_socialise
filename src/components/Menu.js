import { useAuth } from "../utils/hooks/useAuth";

const Menu = ({ menuList }) => {
  const { logoutUser } = useAuth();

  console.log(menuList);

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
            {!item.nested && (
              <a className={linkStyle} href={item.link}>
                {item.header}
              </a>
            )}
            {item.nested && (
              <>
                <p className={linkStyle}>
                  {item.header}
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </p>

                <ul>
                  {item.nested.map((item, index) => {
                    if (item.proficiency_level !== "Native")
                      return (
                        <li key={index}>
                          <a>{item.language.language}</a>
                          {/* <p>{item.proficiency_level}</p> */}
                        </li>
                      );
                  })}
                </ul>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

{
  /* <li tabIndex={0}>
<a className="justify-between">
  Parent
  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
</a>
<ul className="p-2">
  <li><a>Submenu 1</a></li>
  <li><a>Submenu 2</a></li>
</ul>
</li> */
}

export default Menu;
