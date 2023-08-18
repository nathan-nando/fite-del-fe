import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Modal} from "react-bootstrap";
import {hideModal} from "../../features/Root/slice.js";


export const ModalCustom = ({modalTitle, modalSize, onSubmit, children, withFooter = true}) => {
    const state = useSelector((state) => state.globalState);
    const dispatch = useDispatch();

    return <>
        <Modal show={state.showModal} onHide={() => dispatch(hideModal())} animation={true} size={modalSize}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>{children}</Modal.Body>
                {withFooter ?  <Modal.Footer>
                    <Button variant={"secondary"} onClick={() => dispatch(hideModal())}>Close</Button>
                    <Button type={"submit"} variant={"primary"}>Save</Button>
                </Modal.Footer> : ""}

            </Form>
        </Modal>
    </>
}