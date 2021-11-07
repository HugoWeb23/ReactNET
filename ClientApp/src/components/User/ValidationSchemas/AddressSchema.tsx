import * as yup from 'yup'

export const AddressSchema = yup.object().shape({
    //rue: yup.string().required('Veuillez saisir une rue'),
    //numero: yup.string().required('Veuillez saisir un numéro'),
    code_postal: yup.number().typeError('Le code postal doit être composé de chiffres').required('Veuillez saisir un code postal'),
    ville: yup.string().required('Veuillez saisir une ville')
})