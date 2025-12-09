import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  HomeIcon,
  ShoppingCartIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { axiosRequest, getConfig } from "../../helpers/config";
import { setAuthState, logout } from "../../store/user/userSlice";
import { resetCheckout } from "../../store/cart/cartSlice";

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
      dispatch(resetCheckout());
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
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      "flex items-center gap-1 relative rounded-md px-3 py-2 text-sm font-medium"
                    )
                  }
                >
                  <HomeIcon className="h-4 w-4" />
                  Home
                </NavLink>
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
                          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium"
                        )
                      }
                    >
                      <ArrowLeftEndOnRectangleIcon className="w-4 h-4" />
                      Login
                    </NavLink>

                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium"
                        )
                      }
                    >
                      <UserPlusIcon className="w-4 h-4" />
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
                          "flex items-center gap-1 rounded-md px-3 py-2 text-base font-medium"
                        )
                      }
                    >
                      <UserIcon className="h-4 w-4" />
                      {user.name}
                    </NavLink>
                    <button
                      onClick={logoutUser}
                      className="flex items-center gap-1 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <ArrowLeftStartOnRectangleIcon className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                )}
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      "flex items-center relative gap-1 rounded-md px-3 py-2 text-sm font-medium"
                    )
                  }
                >
                  <ShoppingCartIcon className="h-4 w-4" />
                  <span>
                    Cart
                    {cartItems.length > 0 && (
                      <span className="ml-1">({cartItems.length})</span>
                    )}
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden border-t border-gray-200 bg-white">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames(
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                "flex items-center rounded-md px-3 py-2 text-base font-medium"
              )
            }
          >
            <HomeIcon className="h-4 w-4 mr-1" />
            Home
          </NavLink>
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
                    "flex items-center rounded-md px-3 py-2 text-base font-medium"
                  )
                }
              >
                <ArrowLeftEndOnRectangleIcon className="w-4 h-4 mr-1" />
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    "flex items-center ounded-md px-3 py-2 text-base font-medium"
                  )
                }
              >
                <UserPlusIcon className="w-4 h-4 mr-1" />
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
                    "flex items-center rounded-md px-3 py-2 text-base font-medium"
                  )
                }
              >
                <UserIcon className="h-4 w-4 mr-1" />
                {user.name}
              </NavLink>
              <button
                onClick={logoutUser}
                className="blflex items-center ck w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <ArrowLeftStartOnRectangleIcon className="h-4 w-4 mr-1 inline" />
                Logout
              </button>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    "flex items-center rounded-md px-3 py-2 text-base font-medium"
                  )
                }
              >
                <ShoppingCartIcon className="h-4 w-4 mr-1" />
                Cart
                {cartItems.length > 0 && (
                  <span className="ml-1">({cartItems.length})</span>
                )}
              </NavLink>
            </>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
