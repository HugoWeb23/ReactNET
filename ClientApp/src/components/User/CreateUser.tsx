import { useEffect, useState } from "react"
import { yupResolver } from '@hookform/resolvers/yup'
import { ApiErrors, apiFetch } from "../apiFetch"
import { UserForm } from "../Forms/UserForm"
import { UserSchema } from "./ValidationSchemas/UserSchema"
import {
    Form,
    Button
} from 'react-bootstrap'
import { useForm, FormProvider } from "react-hook-form"

export const CreateUser = () => {

    const FormProps = useForm({ resolver: yupResolver(UserSchema) })

    const OnCreateUser = async (data: any) => {
        try {
            const file = data.image[0]
            delete data.image
            const submituser = await apiFetch(`/api/user/new`, {
                method: 'POST',
                body: JSON.stringify(data)
            })
            FormProps.reset()

            if (file) {
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
        <FormProvider {...FormProps}>
            <Form onSubmit={FormProps.handleSubmit(OnCreateUser)}>
                <UserForm />
                <div className="d-grid gap-2 mt-3 mb-3">
                    <Button variant="primary" size="lg" type="submit">Créer l'utilisateur</Button>
                </div>
            </Form>
        </FormProvider>
    </>
}