import * as yup from 'yup'

export const UserSchema = yup.object().shape({
    nom: yup.string().required('Veuillez saisir un nom').min(3, 'Le nom est trop court'),
    prenom: yup.string().required('Veuillez saisir un prénom').min(3, 'Le prénom est trop court'),
    email: yup.string().required('Veuillez saisir un prénom').email('Veuillez saisir une adresse e-mail valide'),
    age: yup.number().typeError('Veuillez saisir un chiffre').required('Veuillez saisir un age').test("Age > 18", "L'âge doit être supérieur à 18", (value: any) => {
        if (value >= 18) {
            return true
        } else {
            return false
        }
    }),
    addresses: yup.array().required().min(1).typeError('Veuillez saisir au moins une adresse')
});