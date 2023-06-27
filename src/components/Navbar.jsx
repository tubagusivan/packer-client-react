import { Link, useNavigate } from "react-router-dom";
import { identityImg, logo } from "../assets/img";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [logOutModal, setlogOutModal] = useState(false);
  function handleModal() {
    setlogOutModal(!logOutModal);
  }
  function clearLocalStorage() {
    localStorage.clear();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Logout is successfully'
    })
    navigate("/login");
  }

  return (
    <>
      <nav id="navbar" className="flex">
        <div className="container mx-auto flex justify-between items-center relative">
          <div id="logoBrand" className="w-2/12">
            <Link to={"/"}>
              <img src={logo} className="w-[70%]" alt="" />
            </Link>
          </div>
          <div id="menuLink" className="flex items-center gap-5">
            <Link to={"/"}>
              <span className="hover:text-[#1F43CF] font-medium">Home</span>
            </Link>
            <Link to={"/watchlist"}>
              <span className="hover:text-[#1F43CF] font-medium">
                Watchlist
              </span>
            </Link>
            <Link to={"/tasklist"}>
              <span className="hover:text-[#1F43CF] font-medium">Task</span>
            </Link>
          </div>
          {
            !isAuthenticated && (
              <div id="actions" className='flex items-center gap-4'>
                <Link to={'/login'}>
                  <button className='bg-transparent border border-[#1F43CF] py-1 px-7 rounded-md text-[#1F43CF] font-normal text-base'>Login</button>
                </Link>
                <Link to={'/register'}>
                  <button className='bg-[#1F43CF] py-1 px-7 font-medium] text-white font-medium rounded-md text-base'>Register</button>
                </Link>
              </div>
            )
          }
          {
            isAuthenticated && (
              <div id="actions" onClick={handleModal} className="cursor-pointer">
                <div className="flex gap-3 items-center">
                  <div id="name">
                    <span>Hi, {localStorage.getItem("username")}</span>
                  </div>
                  <div id="avatar">
                    <img
                      src={identityImg}
                      className="w-[35px] h-[35px] rounded-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            )
          }
          {logOutModal && (
            <div
              id="modalLogout"
              className="bg-white shadow absolute right-0 -bottom-12 py-2 px-4 rounded cursor-pointer"
            >
              <span
                className="flex gap-2 items-center"
                onClick={clearLocalStorage}
              >
                {" "}
                <FaSignOutAlt /> Logout
              </span>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
