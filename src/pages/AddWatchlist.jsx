import { useDispatch } from "react-redux";
import { addRepository } from "../assets/img";
import { addRepoRequest } from "../store/action/actionCreator";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddWatchlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [githubAccessToken, setGithubAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    const formData = {
      name,
      ownerName,
    };
    // Save the github access token in local/session storage
    if (localStorage.access_token && githubAccessToken) {
      localStorage.authorization = `Bearer ${githubAccessToken}`;
    } else if (sessionStorage.access_token && githubAccessToken) {
      sessionStorage.authorization = `Bearer ${githubAccessToken}`;
    }
    if (!formData.name || !formData.ownerName) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "Name and Owner Name is Required",
      });
    } else {
      dispatch(addRepoRequest(formData))
        .then(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: "Add Repo is Succesfully",
          });
          setIsLoading(false);
          navigate("/watchlist");
        })
        .catch((err) => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: `${err.response.data.message}`,
          });
          setIsLoading(false);
          setName("");
          setOwnerName("");
          navigate("/addwatchlist");
        });
    }
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-80">
        <div className="">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      </div>
    );

  return (
    <div id="addwatchlist" className="min-h-screen">
      <div className="container mx-auto shadow border rounded-md p-10 mt-10 flex justify-between items-center">
        <div id="left" className="w-1/2">
          <div id="heading" className="mb-5">
            <h1 className="text-2xl font-bold">Add Repository</h1>
            <p className="text-sm text-gray-500">
              adding repository to watchlist
            </p>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div id="input" className="flex flex-col gap-8">
              <div id="repositoryname" className="flex flex-col">
                <label className="text-gray-500" htmlFor="">
                  Repository name
                </label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  name="name"
                  type="text"
                  className="border border-gray-400 py-3 px-4 text-sm rounded mt-2 w-full"
                  placeholder="Enter your repository name"
                />
              </div>
              <div id="ownerName" className="flex flex-col">
                <label className="text-gray-500" htmlFor="">
                  Repository owner name
                </label>
                <input
                  value={ownerName}
                  onChange={(event) => setOwnerName(event.target.value)}
                  name="ownerName"
                  type="text"
                  className="border border-gray-400 py-3 px-4 text-sm rounded mt-2 w-full"
                  placeholder="Enter owner name"
                />
              </div>
              {/* <div id="githubAccessToken" className="flex flex-col">
                        <label className="text-gray-500" htmlFor="githubAccessToken">Github access token ( optional )</label>
                        <input
                           value={githubAccessToken}
                           onChange={(event) => setGithubAccessToken(event.target.value)}
                           name="githubAccessToken"
                           type="password"
                           className="border border-gray-400 py-3 px-4 text-sm rounded mt-2 w-full"
                           placeholder="* * * * * *"
                        />
                     </div> */}
              <button className="bg-[#1F43CF] py-3 text-white font-medium rounded-md">
                Add Repository
              </button>
            </div>
          </form>
        </div>
        <div id="register">
          <img src={addRepository} alt="" />
        </div>
      </div>
      <hr className="mt-24" />
    </div>
  );
};

export default AddWatchlist;
