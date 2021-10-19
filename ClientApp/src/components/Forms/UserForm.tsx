import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm, useFieldArray, UseFormReturn, Controller } from "react-hook-form"
import {
    Form,
    Button,
    Row,
    Col,
    Card,
    Table
} from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import "react-bootstrap-typeahead/css/Typeahead.css";

export const UserForm = ({ props }: any) => {
    const { register, control, handleSubmit, watch, getValues, setValue, setError, formState: { errors } } = props;
    const { control: addressControl, register: addressRegister, handleSubmit: handleSubmitAddress, formState: { errors: addressErrors } } = useForm();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "addresses",
        keyName: "ad"
    });

    const removeField = async (index: number) => {
        if (fields.length > 1) {
            remove(index)
        }
    }

    const uploadImage = (e: any) => {
        setValue('image', e.target.files[0])
    }

    const onSubmit = (data: any) => {
        append(data)
    }

    return <>
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="prenom">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control type="text" placeholder="Prénom" isInvalid={errors.prenom} {...register('prenom')} />
                    {errors.prenom && <Form.Control.Feedback type="invalid">{errors.prenom.message}</Form.Control.Feedback>}
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="nom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" placeholder="Nom" isInvalid={errors.nom} {...register('nom')} />
                    {errors.nom && <Form.Control.Feedback type="invalid">{errors.nom.message}</Form.Control.Feedback>}
                </Form.Group>
            </Col>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Adresse email</Form.Label>
                <Form.Control type="text" placeholder="Email" isInvalid={errors.email} {...register('email')} />
                {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
            </Form.Group>
            <Col>
                <Form.Group className="mb-3" controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="text" placeholder="Âge" isInvalid={errors.age} {...register('age')} />
                    {errors.age && <Form.Control.Feedback type="invalid">{errors.age.message}</Form.Control.Feedback>}
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type="file" {...register('image')} />
                </Form.Group>
            </Col>
            <Card className="mt-3 mb-3">
                <Card.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId={`rue`}>
                        <Form.Label>Rue</Form.Label>
                        <Form.Control type="text" placeholder="Rue" isInvalid={addressErrors && addressErrors.rue} {...addressRegister(`rue`)} />
                        {addressErrors && addressErrors.rue && <Form.Control.Feedback type="invalid">{addressErrors.rue.message}</Form.Control.Feedback>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId={`numero`}>
                        <Form.Label>Numéro</Form.Label>
                        <Form.Control type="text" placeholder="Numéro" isInvalid={addressErrors && addressErrors.numero} {...addressRegister(`numero`)} />
                        {addressErrors && addressErrors.numero && <Form.Control.Feedback type="invalid">{addressErrors.numero.message}</Form.Control.Feedback>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId={`code_postal`}>
                        <Form.Label>Code postal</Form.Label>
                        <Form.Control type="text" placeholder="Code postal" isInvalid={addressErrors && addressErrors.code_postal} {...addressRegister(`code_postal`)} />
                        {addressErrors && addressErrors.code_postal && <Form.Control.Feedback type="invalid">{addressErrors.code_postal.message}</Form.Control.Feedback>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId={`ville`}>
                        <Form.Label>Ville</Form.Label>
                        <Controller
                            control={addressControl}
                            name={`ville`}
                            render={({
                                field: { onChange, onBlur, value, name, ref }
                            }) => (
                                <Typeahead
                                    id="menu-align-example"
                                    options={[
                                        "Mouscron",
                                        "Tournai",
                                        "Mons",
                                        "Namur"
                                    ]}
                                    placeholder="Sélectionnez une ville"
                                    onChange={(value) => onChange(...value)}
                                    isInvalid={errors.addresses && addressErrors && addressErrors.ville}
                                    emptyLabel='Aucun résultat'
                                    selected={value != undefined ? [value] : []}
                                />
                            )}
                        />
                        {addressErrors && addressErrors.ville && <Form.Control.Feedback type="invalid">{addressErrors.ville.message}</Form.Control.Feedback>}
                    </Form.Group>
                    <Form.Group>
                        <Button onClick={handleSubmitAddress(onSubmit)} size="sm" variant="success">Ajouter l'adresse</Button>
                    </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Row>
        <h3>Adresses</h3>
        <p>Retrouvez ici toutes les adresses de l'utilisateur.</p>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Rue</td>
                    <td>Numéro</td>
                    <td>Ville</td>
                    <td>Code postal</td>
                </tr>
            </thead>
            <tbody>
                {fields.length === 0 && <tr><td colSpan={4}>Aucune adresse</td></tr>}
                {fields.map((field: any, index: number) => <Address field={field} />)}
            </tbody>
        </Table>
    </>
}

const Address = ({field}: any) => {

    return <tr className={field.id ? '' : 'table-success'}>
        <td>{field.id}</td>
        <td>{field.rue}</td>
        <td>{field.numero}</td>
        <td>{field.ville}</td>
        <td>{field.code_postal}</td>
    </tr>
}