import { useState } from 'react';
import { Button, Collapse, Card, CardBody, CardHeader } from 'reactstrap';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

function CollapsedCard({ data }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const cardBody = data["content"].map(content =>
        <div>
            <h4>{content.title}</h4>
            <p>{content.content}</p>
        </div>
    )
    return (
        <>
            <Card style={{padding: "0px", marginBottom:10, marginLeft:10, width:"98.5%"}}>
                <CardHeader onClick={toggle} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#2776c5"}}>
                    <h5 style={{color: "white"}}><b>{data.title}</b></h5>
                    <Button color="#ffffff" onClick={toggle} style={{ textDecoration: 'none' }}>
                        {isOpen ? <FaChevronUp color='white'/> : <FaChevronDown color='white'/>}
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