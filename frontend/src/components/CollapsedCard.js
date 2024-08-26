import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Collapse, Card, CardBody, CardHeader } from 'reactstrap';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

function CollapsedCard({ data }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const cardBody = data["content"].map(content => 
        <div>
            <h2>{content.title}</h2>
            <p>{content.content}</p>
        </div>
    )
    return (
        <>
            <Card>
                <CardHeader onClick={toggle} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{data.title}</span>
                    <Button color="link" onClick={toggle} style={{ textDecoration: 'none' }}>
                        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </Button>
                </CardHeader>
                <Collapse isOpen={isOpen}>
                    <CardBody>
                        {cardBody}
                    </CardBody>
                </Collapse>
            </Card>
        </>
    );
}

export default CollapsedCard;