import { useEffect, useState } from "react"
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form"
import { useHistory } from "react-router"
import { IUser } from "../../Types/Types"
import { ApiErrors, apiFetch } from "../apiFetch"
import { UserForm } from "../Forms/UserForm"
import { UserSchema } from "./ValidationSchemas/UserSchema"
import {
    Form,
    Button
} from 'react-bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css";

export const EditUser = ({ match }: any) => {

    const history = useHistory()
    const [user, setUser] = useState({} as IUser)
    const [loading, setLoading] = useState<boolean>(true)
    const FormProps = useForm({ resolver: yupResolver(UserSchema) })

    useEffect(() => {
        (async () => {
            const fetchuser = await apiFetch('/api/user/get/' + match.params.id, {
                method: "GET",
            })
            if (fetchuser === null) {
                history.push('/')
            } else {
                setUser(fetchuser)
                for (let [key, value] of Object.entries(fetchuser)) {
                    FormProps.setValue(key, value)
                }
                setLoading(false)
            }
        })()
    }, [])

    const OnEditUser = async (data: any) => {
        try {
            const file = data.image[0]
            delete data.image
            const submituser = await apiFetch(`/api/user/update/${user.id}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            })

            if(file) {
                const formData = new FormData()
                formData.append('file', file)
                const test = await apiFetch(`/api/user/body`, {
                    method: 'POST',
                    body: formData
                })
            }
            
        } catch (e) {
            console.log('erreur', e)
            if (e instanceof ApiErrors) {
                e.errorsPerField.forEach((error: any) => {
                    FormProps.setError(error.field, {
                        type: "manual",
                        message: error.message
                    })
                })
            }
        }
    }
    return <>
        {loading ? "Chargement de l'utilisateur" :
            <Form onSubmit={FormProps.handleSubmit(OnEditUser)}>
                <UserForm props={FormProps} />
                <div className="d-flex justify-content-between mt-3 mb-3">
                    <Button variant="primary" size="lg" type="submit">Modifier l'utilisateur</Button>
                    <Button variant="outline-danger" size="sm"><i className="bi bi-trash-fill"></i> Supprimer</Button>
                </div>
            </Form>
        }
    </>
}