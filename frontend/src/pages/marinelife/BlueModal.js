import { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CollapsedCard from '../../components/CollapsedCard';
import axios from "axios";

// const descriptions = [
//     {
//         "title": "Hippocampus whitei",
//         "content": [
//             {
//                 "title": "Habitat",
//                 "content": "Hippocampus whitei is known to occur at depths to 12 m and is found utilising a wide range of habitat types including seagrasses, macroalgae, corals, sponges, and anthropogenic structures (Kuiter 2009, Harasti et al. 2014). In Port Stephens, it has been shown that juveniles prefer gorgonian habitats (Euplexaura sp.) whilst adults had a preference for both sponges and soft coral (Dendronephthya australis) habitats. They were also found occurring in Posidonia seagrass and juveniles also used Sargassum sp. and soft coral habitats (Carijoa sp. and D. australis) (Harasti et al. 2014a). They are known to show a preference for more complex habitats, as it is believed that this provides better protection and more food resources (Hellyer et al. 2011, Harasti et al. 2014a).Burchmore et al. (1984) reported that the species consumes amphipods, but did not elaborate. Most seahorses feed on a variety of small crustaceans, including harpacticoid, caprellid, and cyclopoid copepods, gammarid amphipods, caridean shrimp, and mysids (Woods 2002, Kendrick and Hyndes 2005, Kitsos et al. 2008, Yip et al. 2014).As is the case for other seahorses, Hippocampus whitei are ovoviviparous, and males brood the young in a pouch prior to giving live birth (Foster and Vincent 2004). They breed from October to April. Within this breeding season, they are site-faithful to a home range (averaging 8 m² for males, 12 m² for females: Vincent et al. 2005) and are faithful to a single mate (Vincent and Sadler 1995).The species is known to display strong site fidelity with tagged males occurring on the same site for up to 56 months and females 49 months, whilst no seahorses were ever recorded moving between sites. The species is known not to move far, as the largest distance a tagged animal was found to travel was only 70 m. It has also been shown that individuals show strong fidelity to holdfasts such as sponges, with some individuals being recorded on the same holdfast for up to 17 months (Harasti et al. 2014a).Within Sydney Harbour, seahorses are generally found on artificial habitats such as the protective swimming net enclosures and also on jetty pylons. Their use of these artificial habitats is most likely driven by a loss of natural habitats (such as seagrass, sponges and soft corals) within Sydney Harbour. Seagrass habitats within Sydney Harbour have been shown to decline (West et al. 2004) and anecdotal information suggests large declines in available soft coral and sponge habitats.Growth parameters for Port Stephens were: females L∞ = 149.2 mm and K= 2.034 per year and males L∞ = 147.9 mm and K=2.520 per year compared to estimates from Sydney Harbour:  females L∞ = 139.8 mm and K= 1.285 per year and males L∞ = 141.6 mm and K=1.223 per year (Harasti et al. 2012).Hippocampus whitei displays rapid growth, early maturity and reproduction (Harasti et al. 2012), indicating that it has the ability to develop large populations if conditions are appropriate, such as the availability of suitable habitat and few predators (Harasti et al. 2014b). However, the species has very limited chance for dispersal given that there is no pelagic stage for juveniles, with newborns generally settling in the area of birth and not travelling far (Harasti et al. 2014a). Even though the life-history parameters of H. whitei suggest it may be reasonably resilient, precaution should be taken in its future management as a result of its limited geographical distribution and increasing pressures from anthropogenic sources on its habitats.Although generation length is unknown, the species is thought to be similar to other seahorses in having a generation length of approximately one year. Therefore declines are assessed over a 10-year period for this species, which is thought to be longer than three generation lengths."
//             },
//             {
//                 "title": "Threats",
//                 "content": "The major threat to Hippocampus whitei is loss of essential marine habitats across its range. This species is known to occur along some of the most heavily populated and impacted estuaries in Australia (NSW EPA 2012). As the species displays strong site fidelity and has specific habitat preferences (Vincent et al. 2005, Harasti et al. 2014a), the further loss of key habitats through anthropogenic effects would result in a negative effect on species abundance and distribution; as occurred in Port Stephens (Harasti 2016). Whilst the Port Stephens estuary was previously considered a ‘stronghold’ for populations of H. whitei, the recent population declines as a result of habitat loss indicates that its long-term conservation within the Port Stephens waterway is at risk if essential marine habitats continue to be lost.Within Sydney Harbour, it has been shown that H. whitei are very susceptible to councils cleaning the nets as removal of epibiota caused a decrease in abundance and that the species showed significant avoidance of areas devoid of epibiotic growth (Harasti et al. 2010). Guidelines for cleaning of the nets to minimise harm to the seahorses were developed and provided to councils in 2009 (Harasti et al. 2010); however, councils rarely implement these guidelines."
//             }
//         ]
//     },
//     {
//         "title": "Hippocampus whitei",
//         "content": [
//             {
//                 "title": "Habitat",
//                 "content": "Hippocampus whitei is known to occur at depths to 12 m and is found utilising a wide range of habitat types including seagrasses, macroalgae, corals, sponges, and anthropogenic structures (Kuiter 2009, Harasti et al. 2014). In Port Stephens, it has been shown that juveniles prefer gorgonian habitats (Euplexaura sp.) whilst adults had a preference for both sponges and soft coral (Dendronephthya australis) habitats. They were also found occurring in Posidonia seagrass and juveniles also used Sargassum sp. and soft coral habitats (Carijoa sp. and D. australis) (Harasti et al. 2014a). They are known to show a preference for more complex habitats, as it is believed that this provides better protection and more food resources (Hellyer et al. 2011, Harasti et al. 2014a).Burchmore et al. (1984) reported that the species consumes amphipods, but did not elaborate. Most seahorses feed on a variety of small crustaceans, including harpacticoid, caprellid, and cyclopoid copepods, gammarid amphipods, caridean shrimp, and mysids (Woods 2002, Kendrick and Hyndes 2005, Kitsos et al. 2008, Yip et al. 2014).As is the case for other seahorses, Hippocampus whitei are ovoviviparous, and males brood the young in a pouch prior to giving live birth (Foster and Vincent 2004). They breed from October to April. Within this breeding season, they are site-faithful to a home range (averaging 8 m² for males, 12 m² for females: Vincent et al. 2005) and are faithful to a single mate (Vincent and Sadler 1995).The species is known to display strong site fidelity with tagged males occurring on the same site for up to 56 months and females 49 months, whilst no seahorses were ever recorded moving between sites. The species is known not to move far, as the largest distance a tagged animal was found to travel was only 70 m. It has also been shown that individuals show strong fidelity to holdfasts such as sponges, with some individuals being recorded on the same holdfast for up to 17 months (Harasti et al. 2014a).Within Sydney Harbour, seahorses are generally found on artificial habitats such as the protective swimming net enclosures and also on jetty pylons. Their use of these artificial habitats is most likely driven by a loss of natural habitats (such as seagrass, sponges and soft corals) within Sydney Harbour. Seagrass habitats within Sydney Harbour have been shown to decline (West et al. 2004) and anecdotal information suggests large declines in available soft coral and sponge habitats.Growth parameters for Port Stephens were: females L∞ = 149.2 mm and K= 2.034 per year and males L∞ = 147.9 mm and K=2.520 per year compared to estimates from Sydney Harbour:  females L∞ = 139.8 mm and K= 1.285 per year and males L∞ = 141.6 mm and K=1.223 per year (Harasti et al. 2012).Hippocampus whitei displays rapid growth, early maturity and reproduction (Harasti et al. 2012), indicating that it has the ability to develop large populations if conditions are appropriate, such as the availability of suitable habitat and few predators (Harasti et al. 2014b). However, the species has very limited chance for dispersal given that there is no pelagic stage for juveniles, with newborns generally settling in the area of birth and not travelling far (Harasti et al. 2014a). Even though the life-history parameters of H. whitei suggest it may be reasonably resilient, precaution should be taken in its future management as a result of its limited geographical distribution and increasing pressures from anthropogenic sources on its habitats.Although generation length is unknown, the species is thought to be similar to other seahorses in having a generation length of approximately one year. Therefore declines are assessed over a 10-year period for this species, which is thought to be longer than three generation lengths."
//             },
//             {
//                 "title": "Threats",
//                 "content": "The major threat to Hippocampus whitei is loss of essential marine habitats across its range. This species is known to occur along some of the most heavily populated and impacted estuaries in Australia (NSW EPA 2012). As the species displays strong site fidelity and has specific habitat preferences (Vincent et al. 2005, Harasti et al. 2014a), the further loss of key habitats through anthropogenic effects would result in a negative effect on species abundance and distribution; as occurred in Port Stephens (Harasti 2016). Whilst the Port Stephens estuary was previously considered a ‘stronghold’ for populations of H. whitei, the recent population declines as a result of habitat loss indicates that its long-term conservation within the Port Stephens waterway is at risk if essential marine habitats continue to be lost.Within Sydney Harbour, it has been shown that H. whitei are very susceptible to councils cleaning the nets as removal of epibiota caused a decrease in abundance and that the species showed significant avoidance of areas devoid of epibiotic growth (Harasti et al. 2010). Guidelines for cleaning of the nets to minimise harm to the seahorses were developed and provided to councils in 2009 (Harasti et al. 2010); however, councils rarely implement these guidelines."
//             }
//         ]
//     }
// ]

function BlueModal({ isOpen, speciesType, stateName, threatStatus, updateIsOpen }) {
    const [descriptions, setDescriptions] = useState([]);

    const toggleModal = () => updateIsOpen(!isOpen);

    const listCards = descriptions.map((description, i) =>
        <CollapsedCard data={description} />
    );
    // fetch species description
    useEffect(() => {
        if (!isOpen) return;
        axios
            .get(`https://www.bluevisionary.studio/api/get_description/${stateName[1]}/${threatStatus}/${speciesType}`)
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

export default BlueModal;