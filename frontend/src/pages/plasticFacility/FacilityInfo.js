import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

function FacilityInfo({content}) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <>
            <div>
                <Button color="primary" onClick={toggle} size="sm" className="btn-facility-info">
                    Info
                </Button>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>{content.name}</ModalHeader>
                    <ModalBody>
                        <p>Address: {content.address}</p>
                        <p>Phone: {content.phone}</p>
                        <p>Facility type: {content.type}</p>
                        <p>Website: {content.website}</p>
                    </ModalBody>
                </Modal>
            </div>
        </>
    );
}

export default FacilityInfo;