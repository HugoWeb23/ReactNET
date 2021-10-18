import { Component, FC } from "react";

export interface IUser {
    id: number,
    nom: string,
    prenom: string,
    email: string,
    age: number,
    addresses: IUserAddresse[]
}

export interface IUserAddresse {
    rue: string,
    numero: string,
    code_postal: number,
    ville: string
}

export interface IStateUserHook {
    users: IUser[]
}

export interface IActionsUserHook {
    type: any,
    payLoad: any | []
}

export interface IUserComponent {
    user: IUser
}

export interface IModalForm {
    show: boolean,
    type: 'edit' | 'create',
    form: FC,
    handleClose: () => void
}