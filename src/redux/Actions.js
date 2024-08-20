// Actions.js

import axios from "axios";
import { ADD_STUDENT, CLOSE_EDIT_MODAL, CLOSE_MODAL, DELETE_STUDENT, EDIT_MODAL, FETCH_STUDENT_ERROR, FETCH_STUDENT_REQUEST, FETCH_STUDENT_SUCCESS, OPEN_MODAL, UPDATE_STUDENT } from "./ActionTypes";

export const fetchStudentsRequest = () => {
  return {
    type: FETCH_STUDENT_REQUEST,
  };
};

export const fetchStudentsSuccess = (students) => {
  return {
    type: FETCH_STUDENT_SUCCESS,
    payload: students,
  };
};

export const fetchStudentsError = (error) => {
  return {
    type: FETCH_STUDENT_ERROR,
    payload: error,
  };
};

export const fetchStudents = () => {
  return (dispatch) => {
    dispatch(fetchStudentsRequest());
    axios
      .get("http://localhost:3000/studentss")
      .then((res) => {
        dispatch(fetchStudentsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchStudentsError(err));
      });
  };
};

export const openModal = () => {
  return {
    type: OPEN_MODAL,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

export const openEditModal = () => {
  return {
    type: EDIT_MODAL,
  };
};

export const closeEditModal = () => {
  return {
    type: CLOSE_EDIT_MODAL,
  };
};

export const deleteStudent = (id) => {
  return async (dispatch) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      await axios.delete(`http://localhost:3000/studentss/${id}`).then(() => {
        dispatch({ type: DELETE_STUDENT, payload: id });
      });
    } else {
      alert("Cancelled");
    }
  };
};

// Actions.js

export const updateStudent = (student) => {
  return async (dispatch) => { 
    try {
      const res = await axios.put(`http://localhost:3000/studentss/${student.id}`, student);
      dispatch({ type: UPDATE_STUDENT, payload: res.data });
    } catch (error) {
      dispatch({ type: "UPDATE_STUDENT_ERROR", payload: error });
    }
  };
};

export const addStudent = (student) => {
  return async (dispatch) => { // dispatch argumentini qabul qiling
    try {
      const res = await axios.post("http://localhost:3000/studentss", student);
      dispatch({ type: ADD_STUDENT, payload: res.data });
    } catch (error) {
      dispatch({ type: "ADD_STUDENT_ERROR", payload: error });
    }
  };
};
