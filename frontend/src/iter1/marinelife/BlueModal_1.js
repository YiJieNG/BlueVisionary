import { useEffect, useState } from 'react';
import CollapsedCard from '../../components/CollapsedCard';
import axios from "axios";


function BlueModal_1({ isOpen, speciesType, stateName, threatStatus, updateIsOpen }) {
    const [descriptions, setDescriptions] = useState([]);

    const toggleModal = () => updateIsOpen(!isOpen);

    const listCards = descriptions.map((description, i) =>
        <CollapsedCard data={description} />
    );
    // fetch species description
    useEffect(() => {
        if (!isOpen) return;
        axios
            .get(`/api/get_description/${stateName[1]}/${threatStatus}/${speciesType}`)
            .then((res) => {
                console.log(res)
                setDescriptions(res.data)
            })
            .catch(err => {
                console.log(err);
            });

    }, [speciesType, stateName, threatStatus]);
    return (
        <>
            {/* <Modal isOpen={isOpen} toggle={toggleModal} size='xl'>
                <ModalHeader toggle={toggleModal}>{threatStatus} {speciesType} - {stateName[0]}</ModalHeader>
                <ModalBody>
                        { listCards }
                </ModalBody>
            </Modal> */}
            { listCards }
        </>
    );
}

export default BlueModal_1;