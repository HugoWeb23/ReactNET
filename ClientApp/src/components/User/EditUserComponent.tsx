import { useEffect } from 'react'
import {
    Form,
    Button,
    Alert
} from 'react-bootstrap'
import { UserForm } from "../Forms/UserForm"
import { UserSchema } from "./ValidationSchemas/UserSchema"
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider } from "react-hook-form"
import { ApiErrors, apiFetch } from "../apiFetch"

export const EditUserComponent = ({user}: any) => {
    const FormProps = useForm({ resolver: yupResolver(UserSchema) })

    useEffect(() => {
        for (let [key, value] of Object.entries(user)) {
            FormProps.setValue(key, value)
        }

    }, [])

    const OnEditUser = async(data: any) => {
        try {
            const file = data.image[0]
            delete data.image
            const submituser = await apiFetch(`/api/user/update/${user.id}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            })

            if (file) {
                const formData = new FormData()
                formData.append('file', file)
                const test = await apiFetch(`/api/user/body`, {
                    method: 'POST',
                    body: formData
                })
            }
        } catch(e) {
            if (e instanceof ApiErrors) {
                e.errorsPerField.forEach((error: any) => {
                    FormProps.setError(error.field, {
                        type: "manual",
                        message: error.message
                    }, { shouldFocus: true })
                })
            }
        }
    }

    return <>
    <h3 className="mb-3">Modifier un utilisateur</h3>
                {FormProps.formState.isSubmitSuccessful && <Alert variant="success">L'utilisateur a été modifié</Alert>}
                <FormProvider {...FormProps}>
                    <Form onSubmit={FormProps.handleSubmit(OnEditUser)}>
                        <UserForm />
                        <div className="d-flex justify-content-between mt-3 mb-3">
                            <Button variant="primary" size="lg" type="submit" disabled={FormProps.formState.isSubmitting}>Modifier l'utilisateur</Button>
                            <Button variant="outline-danger" size="sm"><i className="bi bi-trash-fill"></i> Supprimer</Button>
                        </div>
                    </Form>
                </FormProvider>
    </>
}