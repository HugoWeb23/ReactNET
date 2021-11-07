import react, { useReducer } from 'react'
import {IStateUserHook, IActionsUserHook, IUser} from '../Types/Types'
import { apiFetch } from '../components/apiFetch'

export const UserHook = () => {

    const reducer = (state: IStateUserHook, action: IActionsUserHook) => {
        switch(action.type) {
            case 'GETALL':
                return {...state, users: action.payLoad}
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
        }
    }
}