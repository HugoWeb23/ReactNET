import react, { useReducer } from 'react'
import {IStateUserHook, IActionsUserHook, IUser} from '../Types/Types'
import { apiFetch } from '../components/apiFetch'

export const UserHook = () => {

    const reducer = (state: IStateUserHook, action: IActionsUserHook) => {
        switch(action.type) {
            case 'GETALL':
                return {...state, users: action.payLoad}
            case 'DELETEONE':
                return {...state, users: state.users.filter((user: IUser) => user != action.payLoad)}
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, { users: []});

    return {
        users: state.users,
        GetAllUsers: async () => {
            const users = await apiFetch('/api/user/getall', {
                method: "GET"
            })
            dispatch({type: 'GETALL', payLoad: users})
        },
        DeleteUser: async (user: IUser) => {
            await apiFetch(`/api/user/delete/${user.id}`, {
                method: "DELETE"
            })
            dispatch({type: 'DELETEONE', payLoad: user})
        }
    }
}