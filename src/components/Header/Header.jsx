import { LogoutBtn, Container } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo";

function Header() {
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      endPoint: "/",
      active: true,
    },
    {
      name: "All Posts",
      endPoint: "/all-posts",
      active: loginStatus,
    },
    {
      name: "Add Posts",
      endPoint: "/add-posts",
      active: loginStatus,
    },
    {
      name: "Login",
      endPoint: "/login",
      active: !loginStatus,
    },
    {
      name: "Sign Up",
      endPoint: "/sign-up",
      active: !loginStatus,
    },
  ];

  return (
    <>
      <header className="px-7 py-4 text-black bg-gray-500 flex justify-end items-center">
        <Link to="/">
          <Logo width="70px"></Logo>
        </Link>
        <ul className="flex justify-evenly items-center">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  className="hover:text-gray-700 p-2 mx-1"
                  onClick={() => navigate(item.endPoint)}
                >
                  {" "}
                  {item.name}
                </button>
              </li>
            ) : null
          )}
        {loginStatus ? <li key="Logout"> <LogoutBtn />  </li> : null}
        </ul>
      </header>
    </>
  );
}

export default Header;
