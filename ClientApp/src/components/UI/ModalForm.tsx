import {
    Modal,
    Button
} from 'react-bootstrap'
import { IModalForm } from '../../Types/Types'

export const ModalForm = ({show, type, form: Form, handleClose}: IModalForm) => {
    return <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{`${type == 'create' ? 'Créer' : 'Modifier'} un utilisateur`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {`${type == 'create' ? 'Créer' : 'Modifier'}`}
          </Button>
        </Modal.Footer>
      </Modal>
      </>
}