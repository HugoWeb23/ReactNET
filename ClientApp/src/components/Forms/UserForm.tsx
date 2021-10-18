import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm, useFieldArray, UseFormReturn, Controller } from "react-hook-form"
import {
    Form,
    Button,
    Row,
    Col,
    Card,
    Image
} from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import "react-bootstrap-typeahead/css/Typeahead.css";

export const UserForm = ({ props }: any) => {
    const { register, control, handleSubmit, watch, getValues, setValue, setError, formState: { errors } } = props;
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

    return <>
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="prenom">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control type="text" placeholder="Prénom" isInvalid={errors.prenom} {...register('prenom')} />
                    {errors.prenom && <Form.Control.Feedback type="invalid">{errors.prenom.message}</Form.Control.Feedback>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="nom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" placeholder="Nom" isInvalid={errors.nom} {...register('nom')} />
                    {errors.nom && <Form.Control.Feedback type="invalid">{errors.nom.message}</Form.Control.Feedback>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Adresse email</Form.Label>
                    <Form.Control type="text" placeholder="Email" isInvalid={errors.email} {...register('email')} />
                    {errors.email && <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="text" placeholder="Âge" isInvalid={errors.age} {...register('age')} />
                    {errors.age && <Form.Control.Feedback type="invalid">{errors.age.message}</Form.Control.Feedback>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                <Form.Label>Photo</Form.Label>
                <Form.Control type="file" {...register('image')} />
                </Form.Group>
            </Col>
            <Col>
                {fields.map((field: any, index: number) => {
                    return <Card key={field.id} className="mb-3">
                        <Card.Body>
                            <Form.Group className="mb-3" controlId={`rue-${index}`}>
                                <Form.Label>Rue</Form.Label>
                                <Form.Control type="text" placeholder="Rue" isInvalid={errors.addresses && errors.addresses[index]?.rue} {...register(`addresses.${index}.rue`)} />
                                {errors.addresses && errors.addresses[index]?.rue && <Form.Control.Feedback type="invalid">{errors.addresses[index].rue.message}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId={`numero-${index}`}>
                                <Form.Label>Numéro</Form.Label>
                                <Form.Control type="text" placeholder="Numéro" isInvalid={errors.addresses && errors.addresses[index]?.numero} {...register(`addresses.${index}.numero`)} />
                                {errors.addresses && errors.addresses[index]?.numero && <Form.Control.Feedback type="invalid">{errors.addresses[index].numero.message}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId={`code_postal-${index}`}>
                                <Form.Label>Code postal</Form.Label>
                                <Form.Control type="text" placeholder="Code postal" isInvalid={errors.addresses && errors.addresses[index]?.code_postal} {...register(`addresses.${index}.code_postal`)} />
                                {errors.addresses && errors.addresses[index]?.code_postal && <Form.Control.Feedback type="invalid">{errors.addresses[index].code_postal.message}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId={`ville-${index}`}>
                                <Form.Label>Ville</Form.Label>
                                <Controller
                                    control={control}
                                    name={`addresses.${index}.ville`}
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
                                            isInvalid={errors.addresses && errors.addresses[index]?.ville}
                                            emptyLabel='Aucun résultat'
                                            selected={value != undefined ? [value] : []}
                                        />
                                    )}
                                />
                                {errors.addresses && errors.addresses[index]?.ville && <Form.Control.Feedback type="invalid">{errors.addresses[index].ville.message}</Form.Control.Feedback>}
                            </Form.Group>
                            <Button variant="info" size="sm" disabled={!(fields.length > 1)} onClick={() => removeField(index)}>Supprimer</Button>
                        </Card.Body>
                    </Card>
                })}
                <Form.Group>
                    <Button variant="secondary" type="button" onClick={() => append({})} disabled={fields.length > 3}>Ajouter une adresse</Button>
                </Form.Group>
            </Col>
        </Row>
    </>
}