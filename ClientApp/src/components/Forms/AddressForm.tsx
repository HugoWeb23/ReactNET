import { Form, Button } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { AddressSchema } from '../User/ValidationSchemas/AddressSchema'
import { Typeahead } from 'react-bootstrap-typeahead'

export const AddressForm = ({onSubmit}: any) => {

    const { control: addressControl, register: addressRegister, handleSubmit: handleSubmitAddress, formState: { errors: addressErrors }, reset } = useForm({ resolver: yupResolver(AddressSchema) });

    const submit = (data: any) => {
        onSubmit(data)
        reset()
    }

    return <Form>
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
                        isInvalid={addressErrors && addressErrors.ville}
                        emptyLabel='Aucun résultat'
                        selected={value != undefined ? [value] : []}
                    />
                )}
            />
            {addressErrors && addressErrors.ville && <Form.Control.Feedback type="invalid">{addressErrors.ville.message}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group>
            <Button onClick={handleSubmitAddress(submit)} size="sm" variant="success">Ajouter l'adresse</Button>
        </Form.Group>
    </Form>
}