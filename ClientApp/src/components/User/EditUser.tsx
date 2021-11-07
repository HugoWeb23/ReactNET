import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { IUser } from "../../Types/Types"
import { apiFetch } from "../apiFetch"
import { EditUserComponent } from "./EditUserComponent"
import "bootstrap-icons/font/bootstrap-icons.css";
import { SingleUserHook } from "../../Hooks/SingleUserHook"

export const EditUser = ({ match }: any) => {

    const history = useHistory()
    const {user, GetUser} = SingleUserHook()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            try {
               await GetUser(match.params.id)
            } catch(e) {
                history.push('/')
            }
        })()
    }, [])

    return <>
        {Object.keys(user).length != 0 &&
            <>
                <EditUserComponent user={user}/>
            </>
        }
    </>
}