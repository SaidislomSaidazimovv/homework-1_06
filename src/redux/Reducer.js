import { CLOSE_EDIT_MODAL, CLOSE_MODAL, DELETE_STUDENT, EDIT_MODAL, FETCH_STUDENT_ERROR, FETCH_STUDENT_REQUEST, FETCH_STUDENT_SUCCESS, OPEN_MODAL, UPDATE_STUDENT } from "./ActionTypes"

const initialState = {
    loading: false,
    students: [],
    error: "",
    addModal: false,
    editModal: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STUDENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_STUDENT_SUCCESS:
            return {
                loading: false,
                students: action.payload,
                error: ""
            };
        case FETCH_STUDENT_ERROR:
            return {
                loading: false,
                students: [],
                error: action.payload
            };
        case OPEN_MODAL:
            return {
                ...state,
                addModal: true,
            };
        case CLOSE_MODAL:
            return {
                ...state,
                addModal: false,
            };
        case EDIT_MODAL:
            return {
                ...state,
                editModal: true,

            }
        case CLOSE_EDIT_MODAL:
            return {
                ...state,
                editModal: false,
            };

            case DELETE_STUDENT:
                return {
                  ...state,
                  students: state.students.filter(
                    (student) => student.id !== action.payload
                  ),
                };
                case UPDATE_STUDENT:
                  return {
                    ...state,
                    students: state.students.map((student) => {
                        return student.id === action.payload.id ? { ...student, ...action.payload } : student;
                    }),
                  };
            default:
              return state;
    }
}
export default reducer