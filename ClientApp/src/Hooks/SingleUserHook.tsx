import { useState } from "react"
import { apiFetch } from "../components/apiFetch"
import { IUser } from "../Types/Types"

export const SingleUserHook = () => {
    const [user, setUser] = useState({} as IUser)

    return {
        user,
        GetUser: async(id: number) => {
            const fetchuser = await apiFetch(`/api/user/get/${id}`, {
                method: "GET",
            })
            if(fetchuser != null) {
                setUser(fetchuser)
            }
            return fetchuser
        }
    }
}