import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { axiosRequest, getConfig } from "../../helpers/config";
import { setAuthState, logout } from "../../store/user/userSlice";
const navigation = [
  { name: "Home", href: "/" },
  { name: "Cart", href: "/cart" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { isLoggedIn, token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await axiosRequest.get("user", getConfig(token));
        dispatch(
          setAuthState({
            user: response.data.user,
            token,
          })
        );
      } catch (error) {
        if (error?.response?.status === 401) {
          dispatch(logout());
        }
        console.log(error);
      }
    };
    if (token) getLoggedInUser();
  }, [token, dispatch]);

  const logoutUser = async () => {
    try {
      await axiosRequest.post("user/logout", null, getConfig(token));
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Disclosure as="nav" className="relative bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-2 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>

              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          {/* Logo + Desktop Nav */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="React Learning"
                src="/images/logo.png"
                className="h-8 w-auto"
              />
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                        "flex items-center relative rounded-md px-3 py-2 text-sm font-medium"
                      )
                    }
                  >
                    {item.name}
                    {item.name === "Cart" && cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold bg-gray-800 text-white">
                        {cartItems.length}
                      </span>
                    )}
                  </NavLink>
                ))}
                {/* Auth links */}
                {!isLoggedIn ? (
                  <>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium"
                        )
                      }
                    >
                      Login
                    </NavLink>

                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium"
                        )
                      }
                    >
                      Register
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                          "flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium"
                        )
                      }
                    >
                      <UserIcon className="h-4 w-4" />
                      {user.name}
                    </NavLink>
                    <button
                      onClick={logoutUser}
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden border-t border-gray-200 bg-white">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  "flex items-center rounded-md px-3 py-2 text-base font-medium"
                )
              }
            >
              <span>{item.name}</span>

              {item.name === "Cart" && cartItems.length > 0 && (
                <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-800 px-1 text-xs font-bold text-white">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          ))}
          {/* Auth links */}
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    "flex items-center gap-3  rounded-md px-3 py-2 text-base font-medium"
                  )
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    "flex items-center gap-3  rounded-md px-3 py-2 text-base font-medium"
                  )
                }
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    "flex items-center gap-3  rounded-md px-3 py-2 text-base font-medium"
                  )
                }
              >
                <UserIcon className="h-4 w-4" />
                {user.name}
              </NavLink>
              <button
                onClick={logoutUser}
                className="blflex items-center gap-3 ck w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
