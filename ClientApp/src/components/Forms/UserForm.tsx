import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm, useFieldArray, UseFormReturn, Controller, useFormContext } from "react-hook-form"
import {
    Form,
    Button,
    Row,
    Col,
    Card,
    Table,
    Alert,
    Modal,
    Collapse
} from 'react-bootstrap'
import "react-bootstrap-typeahead/css/Typeahead.css";
import {AddressForm} from './AddressForm';

export const UserForm = () => {
    const { register, control, handleSubmit, watch, getValues, setValue, setError, clearErrors, formState: { errors, isSubmitting } } = useFormContext();
    const [deletedAddress, setDeletedAddress] = useState<any>([])
    const [modalDeletedAddress, setModalDeletedAddress] = useState<boolean>(false)
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "addresses",
        keyName: "ad"
    });
    const [newAddress, setNewAddress] = useState<boolean>(false);

    const uploadImage = (e: any) => {
        setValue('image', e.target.files[0])
    }

    const onSubmit = (data: any) => {
        append(data)
        clearErrors('addresses')
    }

    const deleteAddress = (index: number, field: any) => {
        setDeletedAddress((addresses: any) => [...addresses, field])
        remove(index)
    }

    const handleRestoreAddress = (address: any) => {
        append(address)
        setDeletedAddress((addresses: any) => addresses.filter((add: any) => add != address))
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
            <Button onClick={() => setNewAddress(!newAddress)}>Nouvelle adresse</Button>
        <Collapse in={newAddress}>
            <Card className="mt-3 mb-3">
                <Card.Body>
                   <AddressForm onSubmit={onSubmit}/>
                </Card.Body>
            </Card>
        </Collapse>
        </Row>
        <h3>Adresses</h3>
        <p>Retrouvez ici toutes les adresses de l'utilisateur.</p>
        <DeletedAddressModal isOpen={modalDeletedAddress} handleClose={() => setModalDeletedAddress(!modalDeletedAddress)} addresses={deletedAddress} onRestore={handleRestoreAddress}/>
        {errors.addresses && errors.addresses.type == 'min' && <Alert variant="danger">Veuillez ajouter au moins une adresse.</Alert>}
        <div className="d-flex justify-content-end mb-2">
            {deletedAddress.length > 0 && <Button variant="danger" onClick={() => setModalDeletedAddress(true)}>Adresses supprimées ({deletedAddress.length})</Button>}
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Rue</td>
                    <td>Numéro</td>
                    <td>Ville</td>
                    <td>Code postal</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {fields.length === 0 && <tr><td colSpan={6}>Aucune adresse</td></tr>}
                {fields.map((field: any, index: number) => <Address index={index} field={field} onDelete={deleteAddress} disableOptions={isSubmitting} errors={errors.addresses} />)}
            </tbody>
        </Table>
    </>
}

const Address = ({index, field, onDelete, disableOptions, errors}: any) => {
    
    const test = () => {
        if(errors && errors[index]) {
            return 'table-danger'
        } else if(!field.id) {
            return 'table-success'
        }
    }

    return <>
        <tr key={index} className={test()}>
        <td>{field.id ? field.id : '+'}</td>
        <td>{field.rue}</td>
        <td>{field.numero}</td>
        <td>{field.ville}</td>
        <td>{field.code_postal}</td>
        <td><Button size="sm" variant="primary" disabled={disableOptions}>Modifier</Button> - <Button size="sm" variant="danger" disabled={disableOptions} onClick={() => onDelete(index, field)}>Supprimer</Button></td>
    </tr>
    </>
}

const DeletedAddressModal = ({isOpen, handleClose, addresses, onRestore}: any) => {
    const restore = (value: any) => {
        onRestore(value)
        if(addresses.length <= 1) {
            handleClose()
        }
    }
    return <Modal show={isOpen} onHide={handleClose} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Adresses supprimées</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {addresses.map((address: any, index: number) => {
            return <Row key={index} className="mb-2">
                <Col>{address.rue}</Col>
                <Col><Button size="sm" variant="success" onClick={() => restore(address)}>Restaurer</Button></Col>
            </Row>
        })}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Fermer
      </Button>
    </Modal.Footer>
  </Modal>
}