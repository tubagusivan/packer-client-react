import { useEffect, useRef, useState } from "react";
import { FaColumns } from "react-icons/fa";
import { BsCloudArrowDownFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
   donwloadOutputBuild,
   fetchDetailTaskById,
   fetchTaskLogs,
} from "../store/action/actionCreator";

const TaskDetail = () => {
   const frameRef = useRef(null);
   const [viewLogs, setviewLogs] = useState(false);
   const taskDetail = useSelector((state) => {
      console.log(state.taskDetail, "<<<data skrg uda di task detail");
      return state.taskDetail;
   });
   const logs = useSelector((state) => {
      console.log(state, "<<<logs di task detail");
      return state.getLogs;
   });
   const dispatch = useDispatch();
   const params = useParams();

   function handleLogsView(id) {
      setviewLogs(!viewLogs);
      dispatch(fetchTaskLogs(id));
   }

   // A workaround for setInterval not having access to React's reactive states
   // See: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
   function useInterval(callback, delay) {
      const savedCallback = useRef();

      // Remember the latest callback.
      useEffect(() => {
         savedCallback.current = callback;
      }, [callback]);

      // Set up the interval.
      useEffect(() => {
         function tick() {
            savedCallback.current();
         }
         if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
         }
      }, [delay]);
   }

   function downloadOutput(id) {
      // window.location.href = `http://localhost:3000/tasks/${taskDetail._id}/download`;
      dispatch(donwloadOutputBuild(id));
   }
   useEffect(() => {
      dispatch(fetchDetailTaskById(params.id));
   }, [dispatch, params.id]);

   useEffect(() => {
      if (frameRef.current) {
         frameRef.current.scrollTop = frameRef.current.scrollHeight;
      }
   }, [logs]);

   useInterval(() => {
      if (viewLogs) {
         dispatch(fetchTaskLogs(params.id))
      }
   }, 2000);

   return (
      <div id="taskDetail">
         {Object.keys(taskDetail).length === 0 ? (
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
         ) : (
            <div className="container mx-auto mt-10">
               <div id="top" className="bg-white shadow border rounded-md p-4">
                  <div id="cardData">
                     <div id="name" className="flex items-center gap-3">
                        <FaColumns className="text-2xl" />
                        <h1 className="text-2xl font-bold">{taskDetail.repo.name}</h1>
                     </div>
                     <hr className="border-2 border-[#001462] w-1/12 rounded-full my-2" />
                     <h1>Status : {taskDetail.status}</h1>
                  </div>
               </div>
               <div id="bottom">
                  <div id="action" className="flex gap-4 items-center">
                     {
                        taskDetail.status === "Created" || taskDetail.status === "Scheduled" || (<button
                           onClick={() => {
                              handleLogsView(taskDetail._id);
                           }}
                           className="bg-[#1F43CF] px-5 py-1 rounded-md text-white my-3 text-sm"
                        >
                           View Logs
                        </button>)
                     }
                     {
                        taskDetail.status !== "Succeeded" || (<button
                           onClick={() => {
                              downloadOutput(taskDetail._id);
                           }}
                           className="bg-green-600 px-5 py-1 rounded-md text-white my-3 text-sm flex items-center gap-3 font-medium"
                        >
                           <a
                              href={`http://localhost:3000/tasks/${taskDetail._id}/download`}
                              download
                           ></a>
                           <BsCloudArrowDownFill className="text-white" /> Download Build
                           Output
                        </button>)
                     }
                  </div>
                  {viewLogs && (
                     <div
                        id="logView"
                        className="bg-black rounded-md text-[#D6D8D9] text-sm p-5 shadow"
                     >
                        <div id="header" className="flex gap-2 items-center mb-3">
                           <div className="bg-[#FF6054] h-3 w-3 rounded-full"></div>
                           <div className="bg-[#FEBD2E] h-3 w-3 rounded-full"></div>
                           <div className="bg-[#2AC93F] h-3 w-3 rounded-full"></div>
                        </div>
                        <div className="h-[40vh] overflow-y-auto scrollbar" ref={frameRef}>
                           <pre>{logs.length === 0 ? "Loading.." : logs}</pre>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};

export default TaskDetail;
