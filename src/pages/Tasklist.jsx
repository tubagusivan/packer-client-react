import { useDispatch, useSelector } from "react-redux";
import CardTaskList from "../components/CardTaskList"
import { fetchTasks } from '../store/action/actionCreator'
import { useEffect } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { watchlistEmpty } from "../assets/img";

const Tasklist = () => {
   const dispatch = useDispatch();
   const tasks = useSelector(state => state.tasks);
   const loading = useSelector(state => state.loading);
   const error = useSelector(state => state.error);

   useEffect(() => {
      dispatch(fetchTasks());
   }, [dispatch]);

   console.log(tasks, '<<<<< data task')

   if (loading) return (
      <div className="flex justify-center items-center mt-80">
      <div className="">
         <div
               className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
            >
         </div>
      </div>
      </div>
   )

   if (error) {
      return <p>Error: {error.message}</p>;
   }

   return (
      <div id="tasklist" className="my-5 min-h-screen">
         {
            tasks?.length === 0 ? (
               <div id="content" className="flex justify-center">
                  <div className="contentData">
                     <div id="image">
                        <img src={watchlistEmpty} alt="" />
                     </div>
                     <div id="title" className="text-center mt-3">
                        <h1 className="text-2xl font-semibold">Data is empty !</h1>
                        <p>Your watchlist task is empty, add task </p>
                     </div>
                     <Link to={'/addtask'}>
                        <button className="flex items-center font-medium gap-2 mx-auto bg-[#B9D5FF] text-[#1F43CF] py-1 px-8 rounded-full border border-blue-500 mt-4">
                           <MdPlaylistAdd className="text-3xl" />
                           Add Task
                        </button>
                     </Link>
                  </div>
               </div>
            ) : (
                  <div id="content" className="container mx-auto ">
                     <div id="add" className="flex justify-end mb-8">
                        <Link to={'/addtask'}>
                           <button className="flex items-center font-medium gap-2 mx-auto bg-[#B9D5FF] text-[#1F43CF] py-1 px-8 rounded-full border border-blue-500 mt-4 hover:bg-[#1F43CF] hover:text-white">
                              <MdPlaylistAdd className="text-3xl" />
                              Add Task
                           </button>
                        </Link>
                     </div>
                     <div id="taskCard" className="grid grid-cols-2 gap-4">
                        {tasks && (
                           tasks.map((task) => {
                              return (
                                 <CardTaskList key={task._id} task={task} />
                              )
                           })
                        )
                        }
                     </div>
                  </div>
            )
         }
      </div>
   )
}

export default Tasklist