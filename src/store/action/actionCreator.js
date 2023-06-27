import axios from "axios";
import {
  LOGIN_POST_SUCCESS,
  REGISTER_POST_SUCCESS,
  FETCH_REPOS_REQUEST,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAILURE,
  ADD_REPO_FAILURE,
  ADD_REPO_SUCCESS,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILURE,
  ADD_TASK_SUCCESS,
  FETCH_SEARCH_CONTAINER,
  ADD_FILES_SUCCESS,
  FETCH_TASK_DETAIL_SUCCESS,
  FETCH_TASK_LOGS_SUCCESS,
  DELETE_REPO_SUCCESS,
  DELETE_REPO_FAILURE,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
} from "./actionTypes";
import Swal from "sweetalert2";

const BASE_URL = "http://localhost:3000";
// const BASE_URL = 'https://p2-iproject-server-production-c152.up.railway.app'

export function postRegisterSuccess(payload) {
  return {
    type: REGISTER_POST_SUCCESS,
    payload,
  };
}

export function postLoginSuccess(payload) {
  return {
    type: LOGIN_POST_SUCCESS,
    payload,
  };
}

export const fetchReposRequest = () => ({
  type: FETCH_REPOS_REQUEST,
});

export const fetchReposSuccess = (repos) => ({
  type: FETCH_REPOS_SUCCESS,
  payload: repos,
});

export const fetchReposFailure = (error) => ({
  type: FETCH_REPOS_FAILURE,
  payload: error,
});

export const addRepoFailure = (error) => ({
  type: ADD_REPO_FAILURE,
  payload: error,
});

export const addRepoSuccess = (repository) => ({
  type: ADD_REPO_SUCCESS,
  payload: repository,
});

export function addTaskSuccess(payload) {
  return {
    type: ADD_TASK_SUCCESS,
    payload,
  };
}

export function fetchSearchContainerSuccess(payload) {
  return {
    type: FETCH_SEARCH_CONTAINER,
    payload,
  };
}

export function addFilesSuccess(payload) {
  return {
    type: ADD_FILES_SUCCESS,
    payload,
  };
}

export function fetchTaskDetailSuccess(payload) {
  return {
    type: FETCH_TASK_DETAIL_SUCCESS,
    payload,
  };
}

export function fetchTaskLogsSuccess(payload) {
  return {
    type: FETCH_TASK_LOGS_SUCCESS,
    payload,
  };
}

export function postRegister(data = {}) {
  return async function (dispatch) {
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL}/register`,
        data: data,
        timeout: 2000,
      });
      console.log(response, "Berhasil register");
      const successData = response.data;
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
        title: "Register is successfully",
      });
      dispatch(postRegisterSuccess(successData));
    } catch (error) {
      console.log(error, "<======= Error");
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
        title: "Register not successfully",
      });
      throw error;
    }
  };
}

export function postLogin(data = {}) {
  return async function (dispatch) {
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL}/login`,
        data: data,
        timeout: 5000,
      });
      console.log(response, "Berhasil login");
      const access_token = response.data.access_token;
      const username = response.data.name;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("username", username);
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
          title: "Login is successfully",
        });
      }
      const successData = response.data;
      dispatch(postLoginSuccess(successData));
    } catch (error) {
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
        title: "Login not successfully",
      });
      throw error;
      console.log(error, "<======= Error");
    }
  };
}

export const fetchRepos = () => async (dispatch) => {
  try {
    dispatch(fetchReposRequest());
    let axiosOptions = {
      method: "GET",
      url: `${BASE_URL}/repos`,
      headers: {
        access_token: localStorage.access_token || sessionStorage.access_token,
      },
    };
    const { data } = await axios(axiosOptions);
    dispatch(fetchReposSuccess(data));
  } catch (err) {
    if (err.response) dispatch(fetchReposFailure(err.response.data));
    dispatch(fetchReposFailure(err));
  }
};

export const addRepoRequest = (formData) => async (dispatch) => {
  try {
    const access_token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    const axiosOptions = {
      method: "POST",
      url: `${BASE_URL}/repos`,
      data: formData,
      headers: {
        access_token: access_token,
      },
    };
    const { data } = await axios(axiosOptions);
    // dispatch action to update state with the new repository
    console.log(data);
    dispatch(addRepoSuccess(data));
    dispatch(fetchRepos());
  } catch (err) {
    // dispatch action to update state with error
    dispatch(addRepoFailure(err));
    console.log(err, "<<erronya");
    throw err;
  }
};

export const getTasksRequest = () => ({
  type: GET_TASKS_REQUEST,
});

export const getTasksSuccess = (tasks) => ({
  type: GET_TASKS_SUCCESS,
  payload: tasks,
});

export const getTasksFailure = (error) => ({
  type: GET_TASKS_FAILURE,
  payload: error,
});

export const fetchTasks = () => {
  return async (dispatch) => {
    dispatch(getTasksRequest());
    try {
      let axiosOptions = {
        method: "GET",
        url: `${BASE_URL}/tasks`,
        headers: {
          access_token:
            localStorage.access_token || sessionStorage.access_token,
        },
      };
      const { data } = await axios(axiosOptions);
      console.log(data);
      dispatch(getTasksSuccess(data));
    } catch (error) {
      dispatch(getTasksFailure(error));
    }
  };
};

export function addTaskRequest(data = {}, files = []) {
  return async function (dispatch) {
    console.log(data, "datanya<<<");
    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append("additionalFiles", file);
      }
      for (const field of Object.keys(data)) {
        if (data[field]) {
          if (field === "runAt") {
            for (const key of Object.keys(data[field])) {
              formData.append(`${field}[${key}]`, data[field][key]);
            }
          } else {
            formData.append(field, data[field]);
          }
        }
      }
      const response = await axios({
        method: "post",
        url: `${BASE_URL}/tasks`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          access_token:
            localStorage.access_token || sessionStorage.access_token,
        },
      });
      const successData = response.data;
      console.log(successData, "berhasil");
      if (!data.runAt) {
        await axios({
          method: "post",
          url: `${BASE_URL}/tasks/${successData.id}`,
          headers: {
            access_token:
              localStorage.access_token || sessionStorage.access_token,
          },
        });
      }
      dispatch(postRegisterSuccess(successData));
      dispatch(fetchTasks());
    } catch (error) {
      console.log(error, "<======= Error");
    }
  };
}

export function fetchSearchContainer(filter) {
  return async function (dispatch) {
    try {
      console.log(filter, "ini filter");
      const response = await axios({
        method: "POST",
        url: `${BASE_URL}/tasks/search`,
        headers: {
          access_token:
            localStorage.access_token || sessionStorage.access_token,
        },
        data: {
          filter,
        },
      });
      const successData = response.data;
      console.log(successData, "berhasil");
      dispatch(fetchSearchContainerSuccess(successData));
      return successData;
    } catch (error) {
      console.log(error, "<======= Error");
    }
  };
}

export function addFilesRequest(data = {}) {
  return async function (dispatch) {
    try {
      const uploadFiles = new FormData();
      for (const file of data) {
        uploadFiles.append("additionalFiles", file);
      }
      const response = await axios({
        method: "post",
        url: `${BASE_URL}/files`,
        data: uploadFiles,
        headers: {
          access_token:
            localStorage.access_token || sessionStorage.access_token,
        },
      });
      const successData = response.data;
      console.log(successData, "berhasil");
      dispatch(addFilesSuccess(successData));
      return successData.files;
    } catch (error) {
      console.log(error, "<======= Error");
    }
  };
}

export function fetchDetailTaskById(id) {
  return async function (dispatch) {
    try {
      console.log(id, "<di creator");

      const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/tasks/${id}`,
        headers: {
          access_token:
            localStorage.access_token || sessionStorage.access_token,
        },
      });
      console.log(data);
      dispatch(fetchTaskDetailSuccess(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export function donwloadOutputBuild(id) {
  return async function () {
    try {
      console.log(id, "<<di creator download");
      const { data, headers } = await axios({
        method: "GET",
        url: `${BASE_URL}/tasks/${id}/download`,
        headers: {
          access_token:
            localStorage.access_token || sessionStorage.access_token,
        },
        responseType: "blob",
      });
      console.log(data, headers, "<<<data download");
      const href = URL.createObjectURL(data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", `${id}-build-output.tar`); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } catch (err) {
      console.log(err, "ini error download");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Build output not found!",
      });
    }
  };
}

export function fetchTaskLogs(id) {
  return async function (dispatch) {
    try {
      console.log(id, "<<<di creator task logs");
      const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/tasks/${id}/logs`,
        headers: {
          access_token:
            localStorage.access_token || sessionStorage.access_token,
        },
      });
      dispatch(fetchTaskLogsSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export const deleteRepo = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.delete(`${BASE_URL}/repos/${id}`, {
        headers: {
          access_token: token,
        },
      });
      console.log(response.data);
      dispatch(fetchRepos());
      dispatch({
        type: DELETE_REPO_SUCCESS,
        payload: response.data.message,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: DELETE_REPO_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const deleteTask = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.delete(`${BASE_URL}/tasks/${id}`, {
        headers: {
          access_token: token,
        },
      });
      console.log(response.data);
      dispatch(fetchTasks());
      dispatch({
        type: DELETE_TASK_SUCCESS,
        payload: response.data.message,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: DELETE_TASK_FAILURE,
        payload: error.message,
      });
    }
  };
};
