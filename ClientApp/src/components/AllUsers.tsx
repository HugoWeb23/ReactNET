import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useEffect } from 'react'
import { IUserComponent, IUser } from '../Types/Types'
import { apiFetch } from './apiFetch'
import {
    Table,
    Button,
    Row,
    Col,
    Card,
    Placeholder
} from 'react-bootstrap'
import { UserHook } from '../Hooks/UserHook'
import { ModalForm } from './UI/ModalForm'

const AllUsers = () => {
    const { users, GetAllUsers } = UserHook()
    const [loader, setLoader] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            await GetAllUsers()
            setLoader(false)
        })()
    }, [])

    return <>
        <div className="d-flex justify-content-between align-items-start">
            <h3 className="mb-4">Liste des utilisateurs</h3>
            <Link to={{ pathname: 'newuser' }}><Button className="btn btn-success">Créer un utilisateur</Button></Link>
        </div>
        <Row>
            {loader && Array.from(Array(4).keys()).map(load => <UserPlaceholder/>)}
            {users && users.map((user: IUser, index: number) => <User key={index} user={user} />)}
        </Row>
    </>
}

const User = ({ user }: IUserComponent) => {
    return <>
        <Col xs={3}>
            <Card className="mb-3">
                <Card.Img variant="top" src="https://localhost:5001/Images/flower.jpg" />
                <Card.Body>
                    <Card.Title>{user.prenom} {user.nom}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{`${user.addresses.length} ${user.addresses.length > 1 ? 'adresses' : 'adresse'}`}</Card.Subtitle>
                    <Link to={{ pathname: 'edituser/' + user.id, state: { user: user } }}><Button className="stretched-link">Consulter</Button></Link>
                </Card.Body>
            </Card>
        </Col>
    </>

}

const UserPlaceholder = () => {
    return <>
     <Col xs={3}>
    <Card className="mb-3">
    <Card.Body>
      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={6} />
      </Placeholder>
      <Placeholder as={Card.Text} animation="glow">
        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
        <Placeholder xs={6} /> <Placeholder xs={8} />
      </Placeholder>
      <Placeholder.Button variant="primary" xs={6} />
    </Card.Body>
  </Card>
  </Col>
    </>
}

export default AllUsers;