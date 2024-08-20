import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';

const initialState = {
  students: [],


};

export const GlobalContext = createContext(initialState);
const reducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return {
        ...state,
  
        students: [],
       
      };
    case "Success":
      return {
        ...state,
 
        students: action.payload,
      
      };
    case "Error":
      return {
        ...state,
      
        students: [],
        error: "Something went wrong",
      };
    case "ADD_STUDENT":
      return { ...state,
        
         students: [...state.students, action.payload] };
    case "OPEN_MODAL":
      return {
        ...state,
        addModal: true,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        addModal: false,
      };
      case "DELETE_STUDENT":
        return {
          ...state,
          students: state.students.filter(
            (student) => student.id !== action.payload
          ),
        };
        case "UPDATE_STUDENT":
          return {
            ...state,
            students: state.students.map((student) => {
              return student.id == action.payload.id ? action.payload : student;
            }),
          };
    default:
      return state;
  }
};


export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getStudents = async () => {
    dispatch({ type: "PENDING" });
    try {
      const res = await axios.get("http://localhost:3000/studentss");
      console.log(res.data);
      dispatch({ type: "Success", payload: res.data });
    } catch (error) {
      dispatch({ type: "Error" });
    }
  };
  




  const addStudent = async (student) => {
    try {
      const res = await axios.post("http://localhost:3000/studentss", student);
      dispatch({ type: "ADD_STUDENT", payload: res.data });
    } catch (error) {
      dispatch({ type: "Error" });
    }
  };



  const deleteStudent = async (id) => {
    const confirm = window.confirm('Are you sure you want to log out?');
    if (confirm) {
  
      await axios.delete(`http://localhost:3000/studentss/${id}`).then(() => {
        dispatch({ type: "DELETE_STUDENT", payload: id });
      });
    } else {
      alert('nno')
    }
  };

  const updateStudent = async (student) => {
    await axios
      .put(`http://localhost:3000/studentss/${student.id}`, student)
      .then((res) => {
        dispatch({ type: "UPDATE_STUDENT", payload: res.data });
      });
  };






  return (
    <GlobalContext.Provider
      value={{
        students: state.students,
        getStudents,
        addStudent,
    updateStudent,
  deleteStudent
      }}
    >
      {children}
      
    </GlobalContext.Provider>
  );
};