import { useEffect, useState } from "react";
import { addTask } from "../assets/img";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepos, addTaskRequest, fetchSearchContainer, addFilesRequest } from "../store/action/actionCreator";
import './custom.css'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const AddTask = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const repos = useSelector(state => state.repos)
   const [search, setSearch] = useState('')
   const [suggestion, setSuggestion] = useState([])
   const [scheduleDate, setScheduleDate] = useState('')
   const [scheduleTime, setScheduleTime] = useState('')
   const [uploadFiles, setUploadFiles] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const [repoId, setRepoId] = useState('');
   // console.log(repoId, '<<<<<<');
   const [form, setForm] = useState({
      repo: '',
      releaseAsset: '',
      containerImage: '',
      runCommand: '',
      runAt: null,
      // additionalFiles: []
   })

   const [showPopup, setShowPopup] = useState(false);
   const handleShowPopup = () => setShowPopup(true);
   const handleClosePopup = () => setShowPopup(false);
   function handleOnChangeRepo(event) {
      setRepoId(event.target.value);
      // console.log(repoId, '<<<<<<<<<<<');
   }

   useEffect(() => {
      dispatch(fetchRepos())
   }, [dispatch])

   async function handleSubmitForm(e) {
      handleClosePopup()
      setIsLoading(true)
      e.preventDefault()
      console.log(form, '<<<<<<<<<<<<<<<<<')
      console.log(uploadFiles, '<<<<<<<<<<<<<<')
      // await dispatch(addFilesRequest(uploadFiles)).then((data) => {
      //    setForm({
      //       ...form,
      //       additionalFiles: data.map(el => {
      //          return el.id
      //       })
      //    })
      // })
      await dispatch(addTaskRequest(form, uploadFiles))
      console.log(form)
      await dispatch(addFilesRequest(uploadFiles)).then((data) => {
         setForm({
            ...form,
            additionalFiles: data.map(el => {
               return el.id
            })
         })
      })
      if (!form.repo || !form.releaseAsset || !form.containerImage || !form.runCommand ) {
         console.log("masuk error repo");
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
            icon: 'error',
            title: 'Form is Required'
          })
          setIsLoading(false)
      }
      else {
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
            title: 'Success add new task'
          })
         setIsLoading(false)
         navigate('/tasklist')
      }
   }

   function handleChangeSearch(e) {
      e.preventDefault()
      const { value } = e.target
      console.log(value, 'fungsi search');
      dispatch(fetchSearchContainer(value)).then((data) => {
         console.log(data, "<<ini data")
         setSuggestion(data)
      })
      setSearch(value)
   }

   const onSuggestHandler = (search) => {
      setSearch(search)
      setSuggestion([])
   }

   function handleChangeDate(e) {
      e.preventDefault()
      const { value } = e.target
      setScheduleDate(value)
      console.log(value, 'ini value');
      const splitDate = value.split('-')
      const year = +splitDate[0]
      const month = +splitDate[1]
      const date = +splitDate[2]
      const newForm = { ...form };
      if (newForm.runAt) {
         newForm.runAt = {
            ...newForm.runAt,
            year,
            month,
            date
         }
      } else {
         newForm.runAt = {
            year,
            month,
            date
         }
      }
      setForm(newForm)
   }

   function handleChangeTime(e) {
      e.preventDefault()
      const { value } = e.target
      setScheduleTime(value)
      // const date = new Date(scheduleTime)
      const splitTime = value.split(':')
      const hour = +splitTime[0]
      const minute = +splitTime[1]
      console.log(hour, minute, 'ini value');
      const newForm = { ...form };
      if (newForm.runAt) {
         newForm.runAt = {
            ...newForm.runAt,
            hour,
            minute,
            second: 0
         }
      } else {
         newForm.runAt = {
            hour,
            minute,
            second: 0
         }
      }
      setForm(newForm)
   }

   function handleChangeUpload(e) {
      e.preventDefault()
      setUploadFiles(e.target.files)
   }

   function handleChange(e) {
      const { name, value } = e.target
      setForm({
         ...form,
         [name]: value,
         repo: repoId,
         containerImage: search
      })
   }
   console.log(suggestion, "<<<ini hasil search")
   if (isLoading) return (
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
   return (
      <div id="addTask" className="min-h-screen">
         <div className="container mx-auto shadow border rounded-md p-10 mt-10 flex justify-between items-start">
            <div id="left" className="w-1/2">
               <div id="heading" className="mb-5">
                  <h1 className="text-2xl font-bold">Add Task</h1>
                  <p className="text-sm text-gray-500">adding your task</p>
               </div>
               <form onSubmit={handleSubmitForm} autoComplete="off">
                  <div id="input" className="flex flex-col gap-8">
                     <div id="repositoryname" className="flex flex-col">
                        <label className="text-gray-500" htmlFor="">Repository</label>
                        <select value={repoId} onChange={handleOnChangeRepo} name="repo" id="" className="border border-gray-400 py-3 px-4 text-sm rounded mt-2 w-full">
                           <option value="" defaultValue="select form watchlist">select form watchlist</option>
                           {repos.map((repo) => {
                              return (
                                 <option key={repo._id} value={repo._id}>{repo.name}</option>
                              )
                           })}
                        </select>
                     </div>
                     <div id="releaseAssets" className="flex flex-col">
                        <label className="text-gray-500" htmlFor="">Release assets</label>
                        <select value={form.releaseAsset} onChange={handleChange} name="releaseAsset" id="" className="border border-gray-400 py-3 px-4 text-sm rounded mt-2 w-full">
                           <option defaultValue='Select from endpoint'>Select from endpoint</option>
                           {repos.find(repo => repo._id === repoId)?.latestReleaseAssets.map((release) => {
                              return (
                                 <option key={release._id} value={release.name}>{release.name}</option>
                              )
                           })}
                        </select>
                     </div>
                     <div id="additionalfiles" className="flex flex-col">
                        <label className="text-gray-500" htmlFor="">Additional files</label>
                        <input
                           onChange={handleChangeUpload}
                           name="additionalFiles"
                           type="file"
                           id="additionalFiles"
                           className="border border-gray-400 py-3 px-4 text-sm rounded mt-2 w-full" multiple
                        />
                     </div>
                     <div id="containerimage" className="flex flex-col">
                        <label className="text-gray-500" htmlFor="">Container image</label>
                        <input
                           value={search}
                           onChange={handleChangeSearch}
                           name="containerImage"
                           type="text"
                           className="border border-gray-400 py-3 px-4 text-sm rounded mt-2 w-full"
                           placeholder="Type something here (ex. alpine)"
                        />
                        {suggestion && suggestion.map((item, i) => {
                           return (
                              <div key={i} className="suggestion" onClick={() => onSuggestHandler(item.name)}>{item.name}</div>
                           )
                        })}
                     </div>
                     <div id="runcommand" className="flex flex-col">
                        <label className="text-gray-500" htmlFor="">Run command</label>
                        <input
                           value={form.runCommand}
                           onChange={handleChange}
                           name="runCommand"
                           type="text"
                           className="border border-gray-400 py-3 px-4 text-sm rounded mt-2 w-full"
                           placeholder="terminal command you want to enter"
                        />
                     </div>
                     <div id="actions" className="flex items-center justify-between gap-9">
                        <button className="bg-[#1F43CF] py-3 text-white font-medium rounded-md w-1/2">Start</button>
                        <button type="button" onClick={handleShowPopup} className="bg-[#1F43CF] py-3 text-white font-medium rounded-md w-1/2 flex items-center justify-center gap-3"> <FaRegCalendarAlt />Schedule later</button>
                     </div>
                  </div>
                  {
                     showPopup && (
                        <div id="popupShedule" className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                           <div className="bg-black bg-opacity-70 absolute w-full h-full"></div>
                           <div id="form" className="bg-white p-10 w-1/2 rounded-lg z-10 flex flex-col gap-4">
                              <div id="date" className="flex flex-col">
                                 <label className="text-gray-500" htmlFor="">Date</label>
                                 <input
                                    value={scheduleDate}
                                    onChange={handleChangeDate}
                                    name="date"
                                    type="date"
                                    className="border border-gray-400 py-3 px-4 text-sm rounded mt-2 w-full"
                                    placeholder="terminal command you want to enter"
                                 />
                              </div>
                              <div id="time" className="flex flex-col">
                                 <label className="text-gray-500" htmlFor="">Time</label>
                                 <input
                                    value={scheduleTime}
                                    onChange={handleChangeTime}
                                    name="time"
                                    type="time"
                                    className="border border-gray-400 py-3 px-4 text-sm rounded mt-2 w-full"
                                    placeholder="terminal command you want to enter"
                                 />
                              </div>
                              <div id="actions" className="flex items-center justify-between gap-9">
                                 <button className="bg-[#1F43CF] py-3 text-white font-medium rounded-md w-3/5">Schedule</button>
                                 <button onClick={handleClosePopup} type="button" className="bg-rose-800 py-3 text-white font-medium rounded-md w-1/5">Cancel</button>
                              </div>
                           </div>
                        </div>
                     )
                  }
               </form>
            </div>
            <div id="register">
               <img src={addTask} alt="" />
            </div>
         </div>
         <hr className="mt-24" />
      </div>
   )
}


export default AddTask