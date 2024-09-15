import { useState } from "react";
import { Button, Collapse, Card, CardBody, CardHeader } from "reactstrap";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

function PollutionCard({ title, content }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Card
                style={{
                    padding: "0px",
                    marginBottom: 10,
                    marginLeft: 10,
                    width: "98.5%",
                }}
            >
                <CardHeader
                    onClick={toggle}
                    style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#2776c5",
                    }}
                >
                    <h5 style={{ color: "white" }}>
                        <b>{title}</b>
                    </h5>

                    <Button
                        color="#ffffff"
                        onClick={toggle}
                        style={{ textDecoration: "none" }}
                    >
                        {isOpen ? (
                            <FaChevronUp color="white" />
                        ) : (
                            <FaChevronDown color="white" />
                        )}
                    </Button>
                </CardHeader>
                <Collapse isOpen={isOpen}>
                    <CardBody>
                        <div
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </CardBody>
                </Collapse>
            </Card>
        </>
    );
}

function PollutionDataInsights({ selectedState }) {
    if (selectedState === "NSW") {
        return (
            <>
                <div>
                    <h4>NSW Polymer Trend Insights:</h4>
                </div>
                <div>
                    <PollutionCard title={"1. Polyethylene"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> There's a sharp increase in 2022, reaching a peak
                                of 191, then a significant drop in 2023 down to 30. There was a 
                                <strong class="red">478% increase</strong> from 2021 to 2022, followed
                                by an <strong class="green">84% decrease</strong> by 2023. This
                                polymer, <strong>commonly used in household</strong> products like water
                                bottles and plastic jars, likely surged due to increased demand
                                for packaged goods during 2022, potentially due to 
                                <strong>consumer behaviour shifts during the COVID-19 pandemic</strong>.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Implement stricter recycling programs
                                and promote alternatives such as cloth bags, glass bottles, and
                                stainless-steel containers to reduce reliance on polyethylene.
                            </li>
                        </ul>
                        `} />
                    <PollutionCard title={"2. Polyethylene Glycol"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> This polymer shows a steady increase from 13 in
                                2021 to 72 in 2023. This polymer 
                                <strong class="red">rose 438%</strong> between 2021 and 2023.
                                Polyethylene glycol is commonly used in the 
                                <strong>pharmaceutical and cosmetics</strong> industries. The increase
                                could be linked to <strong>higher production of medical creams</strong> 
                                during the pandemic.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Promote natural alternatives in
                                pharmaceuticals and skincare, such as plant-based products.
                            </li>
                        </ul>
                        `} />
                </div>
                <div>
                    <h4>Potential Cause for general trend</h4>
                </div>
                <div>
                    <strong>Urban Consumption:</strong> New South Wales (NSW), being one of
                    Australia's most populous and urbanized states, likely saw higher
                    plastic consumption in sectors such as{" "}
                    <strong>household items, food packaging, and pharmaceuticals</strong>. To reduce
                    the plastic pollution, you can enhance sustainability practices,
                    promote alternatives, and continue regulatory efforts.
                </div>
            </>
        );
    } else if (selectedState === "NT") {
        return (
            <>
                <div>
                    <h4>NT Polymer Trend Insights:</h4>
                </div>
                <div>
                    <PollutionCard title={"1. Polyethylene Glycol"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> This polymer <strong class="green">remains at 0</strong> 
                                from 2021 to 2022, but spikes significantly to 16 in 2023 before
                                dropping back to 0 in 2024. This is a 
                                <strong class="red">1600% increase</strong> between 2021 and 2023. The
                                dramatic rise in 2023 could be attributed to a surge in demand
                                from the <strong>pharmaceutical or cosmetics</strong> industries, which
                                may have been driven by external market forces or local
                                production increases.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Promote natural skincare and
                                pharmaceutical alternatives, such as plant-based lotions, to
                                avoid reliance on polyethylene glycol.
                            </li>
                        </ul>
                        `} />
                </div>
                <div>
                    <h4>Potential Cause for general trend</h4>
                </div>
                <div>
                    <strong>Limited Industrial and Urban Consumption:</strong> The overall low
                    numbers in NT, compared to more urbanized regions, can be explained by
                    the <strong>smaller population and less industrial activity</strong>. NT's
                    relatively lower levels of plastic waste are likely due to less
                    reliance on single-use plastics and reduced consumer demand.
                </div>
            </>
        );
    } else if (selectedState === "QLD") {
        return (
            <>
                <div>
                    <h4>QLD Polymer Trend Insights:</h4>
                </div>
                <div>
                    <PollutionCard title={"1. Polyethylene"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> Polyethylene usage remains relatively high,
                                increasing slightly from 80 in 2021 to 82 in 2022, before
                                declining steadily to 62 in 2023. This represents a 
                                <strong class="red">2.5% increase</strong> from 2021 to 2022, followed
                                by a <strong class="green">24% decrease</strong> by 2023. The slight
                                increase in 2022 might be attributed to continued reliance on
                                polyethylene for <strong>packaging and household products</strong>.
                                However, the decline in subsequent years reflects growing
                                awareness of plastic pollution and a shift toward more
                                sustainable practices.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Promote alternatives like glass bottles,
                                reusable containers, and cloth bags to reduce the usage of
                                polyethylene in both household and industrial applications.
                            </li>
                        </ul>
                        `} />
                    <PollutionCard title={"2. Polypropylene"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> Polypropylene saw an increase from 24 in 2021 to
                                29 in 2023. This is a <strong class="red">21% increase</strong> from
                                2021 to 2023. The rise in polypropylene usage may be linked to
                                increased demand for <strong>consumer goods</strong>, such as plastic
                                bottles and food containers.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Encourage businesses and households to
                                adopt reusable food containers made from sustainable materials
                                like stainless steel or glass to further reduce polypropylene
                                waste.
                            </li>
                        </ul>
                        `} />
                </div>
                <div>
                    <h4>Potential Cause for general trend</h4>
                </div>
                <div>
                    <strong>Urban and Industrial Consumption:</strong> Queensland, being a{" "}
                    <strong>highly urbanized state</strong>, likely experienced higher levels of
                    plastic consumption for household items, packaging, and pharmaceutical
                    products. The increase in thermoplastic use may be tied to the state's
                    reliance on <strong>automotive</strong> and <strong>packaging</strong> industries.
                </div>
            </>
        );
    } else if (selectedState === "SA") {
        return (
            <>
                <div>
                    <h4>SA Polymer Trend Insights:</h4>
                </div>
                <div>
                    <PollutionCard title={"1. Polyethylene"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> Polyethylene saw a sharp increase from 15 in 2021
                                to 204 in 2022, before plummeting to 19 in 2023. This represents
                                a <strong class="red">1260% increase</strong> from 2021 to 2022,
                                followed by a <strong class="green">90% decrease</strong> by 2023. The
                                sudden spike in 2022 may be linked to an increase in consumer
                                and industrial demand for 
                                <strong>packaging and household products</strong> during that year.
                                However, the rapid decline in subsequent years suggests 
                                <strong>significant efforts to reduce reliance</strong> on polyethylene
                                and transition toward sustainable alternatives.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Promote alternatives such as glass
                                bottles, reusable containers, and cloth bags to help further
                                reduce polyethylene usage across both consumer and industrial
                                sectors.
                            </li>
                        </ul>
                        `} />
                    <PollutionCard title={"2. Polypropylene"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> Polypropylene usage surged from 9 in 2021 to 71 in
                                2022, followed by a sharp decline to 5 in 2023. This represents
                                a <strong class="red">689% increase</strong> from 2021 to 2022,
                                followed by a <strong class="green">93% decrease</strong> by 2023. The
                                spike in polypropylene use in 2022 could be attributed to 
                                <strong>increased production and consumption of consumer goods</strong>,
                                such as plastic bottles and food containers. The decline in
                                later years reflects 
                                <strong>greater awareness of plastic pollution</strong> and the adoption
                                of more sustainable practices.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Encourage households and businesses to
                                use reusable food containers, stainless-steel utensils, and
                                glass alternatives to reduce polypropylene waste.
                            </li>
                        </ul>
                        `} />
                </div>
                <div>
                    <h4>Potential Cause for general trend</h4>
                </div>
                <div>
                    <strong>Pandemic Influence (2021-2022):</strong> The sharp rise in polymers such
                    as polyethylene and polypropylene in 2022 could be attributed to
                    increased consumption of disposable plastics for hygiene purposes
                    during the pandemic, as well as a rise in packaged goods consumption.
                </div>
                <div>
                    <strong>Sustainability Efforts (Post-2022):</strong> The significant decline in
                    polymer usage, especially polyethylene and polypropylene, after 2022
                    reflects successful sustainability campaigns and government
                    regulations aimed at reducing plastic waste. There may have been a
                    significant push towards banning single-use plastics and promoting
                    eco-friendly alternatives.
                </div>
            </>
        );
    } else if (selectedState === "TAS") {
        return (
            <>
                <div>
                    <h4>TAS Polymer Trend Insights:</h4>
                </div>
                <div>
                    <PollutionCard title={"1. Polyethylene, Polyethylene Glycol, Thermoplastic"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> These polymer types have less or even 0 from 2021
                                to 2023, but with a significant jump in 2024. This is around 
                                <strong class="red">400% increase</strong> even though 2024 is
                                incomplete. The rise in usage could indicate growing reliance on
                                plastic packaging or consumer products in Tasmania, possibly
                                driven by <strong>an increase in population or tourism</strong>. Given
                                that 2024 is not complete, the trend may continue rising if not
                                addressed.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Encourage consumers and businesses to
                                adopt alternatives for the polymer types mentioned.
                            </li>
                        </ul>
                        `} />
                    <PollutionCard title={"2. Polypropylene"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> Polypropylene started at 0 in 2021 and 2022, then
                                increased to 1 in 2023 before spiking to 15 in 2024. This
                                represents a <strong class="red">1400% increase</strong> from 2023 to
                                2024 (though 2024 is incomplete). The sharp increase suggests
                                that Tasmania may be experiencing 
                                <strong>a surge in plastic products</strong> made from polypropylene, such
                                as packaging materials, plastic containers, and household goods.
                                This trend could reflect shifts in consumer behaviour or
                                increased production.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Promote sustainable alternatives to
                                polypropylene, such as reusable containers and stainless-steel
                                items, to mitigate its rising usage.
                            </li>
                        </ul>
                        `} />
                </div>
                <div>
                    <h4>Potential Cause for general trend</h4>
                </div>
                <div>
                    <strong>Tourism and Population Growth:</strong> The growth in polypropylene and
                    polyethylene usage could be linked to increasing tourism or population
                    growth in Tasmania, leading to a rise in packaging, disposable
                    plastics, and household products. This could be driving the sudden
                    spikes seen in 2024.
                </div>
            </>
        );
    } else if (selectedState === "VIC") {
        return (
            <>
                <div>
                    <h4>VIC Polymer Trend Insights:</h4>
                </div>
                <div>
                    <PollutionCard title={"1. Polyethylene"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> Polyethylene usage saw a steady increase from 3 in
                                2021 to 9 in 2022, peaking at 14 in 2023 before dropping to 0 in
                                2024 (though 2024 is incomplete). This represents a 
                                <strong class="red">200% increase</strong> from 2021 to 2022 and a 
                                <strong class="red">further 55% increase</strong> from 2022 to 2023.
                                The increase in polyethylene could be tied to a rise in consumer
                                goods and packaging demands, potentially driven by 
                                <strong>population growth or industrial needs</strong> in Victoria.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Promote alternatives such as reusable
                                containers, glass bottles, and metal packaging to maintain a
                                downward trend for polyethylene usage in the future.
                            </li>
                        </ul>
                        `} />
                    <PollutionCard title={"2. Polypropylene and Polyethylene Glycol"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> Polypropylene increased slightly from 2021 to
                                2022, before dropping back in 2023. This is an around 
                                <strong class="red">100% increase</strong> from 2021 to 2022, followed
                                by around <strong class="green">50% decrease</strong> by 2023. The
                                fluctuations in polypropylene and polyethylene glycol usage
                                could be related to 
                                <strong>changes in production or consumer preferences</strong> for
                                disposable plastic items such as packaging and household goods.
                                The decline may reflect a gradual 
                                <strong>
                                    shift toward more sustainable alternatives and increased
                                    awareness
                                </strong>
                                .
                            </li>
                            <li>
                                <strong>What you can do:</strong> Continue encouraging businesses and
                                consumers to adopt reusable food containers, stainless-steel
                                items, and other alternatives to further reduce polypropylene
                                waste. Promote natural, plant-based alternatives for
                                pharmaceuticals and cosmetics.
                            </li>
                        </ul>
                        `} />
                </div>
                <div>
                    <h4>Potential Cause for general trend</h4>
                </div>
                <div>
                    <strong>Industrial Demand and Consumer Behaviour:</strong> The increase in
                    polyethylene and polypropylene usage in 2021–2023 likely reflects
                    consumer <strong>reliance on plastic packaging and industrial demand</strong>{" "}
                    for durable plastic materials.
                </div>
                <div>
                    <strong>Sustainability Efforts and Policies:</strong> Victoria's efforts to
                    reduce plastic pollution, through initiatives such as{" "}
                    <strong>recycling programs and bans on single-use plastics</strong>, may have
                    contributed to the decline in polymer use in 2023. The drop in
                    polypropylene and polyethylene glycol usage, in particular, indicates
                    growing awareness of environmental concerns.
                </div>
            </>
        );
    } else if (selectedState === "WA") {
        return (
            <>
                <div>
                    <h4>WA Polymer Trend Insights:</h4>
                </div>
                <div>
                    <PollutionCard title={"1. Polyethylene"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> Polyethylene usage increased from 20 in 2021 to 36
                                in 2022, then slightly declined to 32 in 2023. This represents
                                an <strong class="red">80% increase</strong> from 2021 to 2022,
                                followed by a <strong class="green">11% decrease</strong> in 2023. The
                                rise in polyethylene could be due to 
                                <strong>increased packaging demands or higher production</strong> in WA.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Continue to promote alternatives such as
                                reusable containers, glass bottles, and cloth bags to ensure the
                                decline in polyethylene usage is sustained in WA.
                            </li>
                        </ul>
                        `} />
                    <PollutionCard title={"2. Polypropylene and Polyethylene Glycol"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> Polypropylene usage spiked from 2021 to 2022,
                                reaching highest in 2023. This indicates a more than 
                                <strong class="red">100% increase</strong> from 2021 to 2022, and a
                                further <strong class="red">75% increase</strong> from 2022 to 2023.
                                The increased use of polypropylene and polyethylene glycol,
                                especially in 2023, could be attributed to rising consumer
                                demand for <strong>household goods and packaging materials</strong> as
                                well as <strong>pharmaceutical or cosmetics industries</strong>.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Encourage the use of alternatives such
                                as reusable food containers and metal utensils to further reduce
                                polypropylene waste in WA. Promote the use of natural and
                                plant-based alternatives in the pharmaceutical and cosmetics
                                industries to reduce polyethylene glycol consumption.
                            </li>
                        </ul>
                        `} />
                    <PollutionCard title={"3. Polystyrene"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> Polystyrene usage increased from 0 in 2021 to 1 in
                                2022, 2 in 2023, and 
                                <strong class="red">sharply spiked to 23 in 2024</strong>. The
                                significant spike in 2024 suggests a resurgence in the use of
                                polystyrene, which could be linked to 
                                <strong>specific packaging or industrial uses</strong>. This rise is
                                concerning, as polystyrene is <strong>not easily recyclable</strong> and
                                is <strong>harmful</strong> to the environment.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Focus on stricter regulations and
                                promote biodegradable packaging alternatives, such as
                                paper-based or compostable products.
                            </li>
                        </ul>
                        `} />
                </div>
                <div>
                    <h4>Potential Cause for general trend</h4>
                </div>
                <div>
                    <strong>Industrial and Consumer Demand:</strong> The rise in polyethylene and
                    polypropylene usage from 2021 to 2023 could be due to higher demands
                    in WA’s packaging and household goods industries as well as higher
                    production of hygiene products or pharmaceuticals.
                </div>
                <div>
                    <strong>Concerning Polystyrene Spike in 2024:</strong> The sharp increase in
                    polystyrene in 2024 is concerning, as it indicates a resurgence of
                    this environmentally harmful plastic. The rise may be linked to
                    increased packaging or industrial usage, requiring urgent intervention
                    to promote biodegradable alternatives.
                </div>
            </>
        );
    } else if (selectedState === "ALL") {
        return (
            <>
                <div>
                    <h4>Australia Polymer Trend Insights:</h4>
                </div>
                <div>
                    <PollutionCard title={"1. Polyethylene"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> Polyethylene saw a massive spike from 152 in 2021
                                to 523 in 2022, before dropping to 165 in 2023, and further
                                declining to 78 in 2024. This represents a 
                                <strong class="red">244% increase</strong> from 2021 to 2022, followed
                                by a <strong class="green">68% decrease</strong> from 2022 to 2023.
                                The sharp rise in 2022 could be attributed to 
                                <strong>
                                    increased demand for packaging and plastic products during the
                                    pandemic
                                </strong>
                                . The significant decline in subsequent years suggests that
                                efforts to reduce plastic waste, such as bans on single-use
                                plastics and the promotion of <strong>sustainable alternatives</strong>,
                                have <strong>started to take effect</strong>.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Continue promoting alternatives to
                                polyethylene, such as glass, stainless steel, and reusable
                                containers, while pushing for stricter regulations on single-use
                                plastics.
                            </li>
                        </ul>
                        `} />
                    <PollutionCard title={"2. Polypropylene"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> Exactly the same as Polyethylene in terms of the
                                trend pattern except that the peak amount is 159.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Encourage businesses and consumers to
                                switch to reusable containers and other sustainable options to
                                maintain the downward trend in polypropylene usage.
                            </li>
                        </ul>
                        `} />
                    <PollutionCard title={"3. Polyethylene Glycol"} content={`
                        <ul>
                            <li>
                                <strong>Trend:</strong> Polyethylene glycol usage increased from 18 in
                                2021 to 84 in 2022, then spiked to 136 in 2023. This represents
                                a <strong class="red">655% increase</strong> from 2021 to 2023. The
                                increase in polyethylene glycol use could be tied to a rise in
                                demand from the pharmaceutical and cosmetics industries.
                            </li>
                            <li>
                                <strong>What you can do:</strong> Promote natural and plant-based
                                alternatives to polyethylene glycol in industries such as
                                pharmaceuticals and cosmetics to further reduce its consumption.
                            </li>
                        </ul>
                        `} />
                </div>
                <div>
                    <h4>Potential Cause for general trend</h4>
                </div>
                <div>
                    <strong>Pandemic Influence (2021-2022):</strong> The significant spike in
                    polymers like polyethylene, polypropylene, and polyethylene glycol in
                    2022 can be attributed to the pandemic. The increased demand for
                    packaging materials, hygiene products, and medical supplies likely
                    drove up polymer usage during this period.
                </div>
                <div>
                    <strong>Sustainability Efforts and Regulations:</strong> The subsequent decline
                    in most polymers, especially polyethylene and polypropylene, from 2022
                    to 2023, indicates the growing impact of sustainability initiatives
                    and regulatory efforts to reduce plastic pollution. These measures
                    have encouraged consumers and industries to adopt more eco-friendly
                    alternatives.
                </div>
                <div>
                    <strong>Concerning Increase in Polystyrene:</strong> The gradual increase in
                    polystyrene usage, particularly in 2024, is concerning, as it suggests
                    a return to this environmentally harmful material. This rise may be
                    due to specific sectors, such as packaging and electronics, relying on
                    polystyrene for cost-effective solutions.
                </div>
            </>
        );
    } else {
        return <></>;
    }
}
export default PollutionDataInsights;
