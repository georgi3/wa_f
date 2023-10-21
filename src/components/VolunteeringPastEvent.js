import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {format, parseISO} from "date-fns";
import ImageListGallery from "./gallery/ImageListGallery";
import UserDisplay from "./UserDisplay";
import NotFound from "./404";

export default function VolunteeringPastEvent({ vEvent }){
    const shouldRenderPastEvent = vEvent?.summary;
    if (!shouldRenderPastEvent){
        return (<NotFound />)
    }
    return (
        <Container fluid>
            <Container>
                <h1 className={"fs-1 text-center lead py-3"}>{vEvent?.title}</h1>
                <h3 className={" text-center py-1 lead fs-3"}>Date: {vEvent?.datetime ? format(parseISO(vEvent?.datetime), 'dd/MM/yyyy') : ''}</h3>
            </Container>
            <Container>
                <Row className={"d-flex flex-row"}>
                    <Col className={"p-3 mt-2"} sm={12} lg={6}>
                        <h2 className={" fw-light text-lg-start"}><span className={"border-decor"}>Event Summary</span></h2>
                        <p className={"lead fs-4 "} style={{"textAlign": "justify"}}>{vEvent?.summary}</p>
                        <ul className={"lead fs-4  px-0"}>
                            <li className={"list-unstyled d-flex justify-content-between py-1 border-bottom"}><span>Location:</span> <span>{vEvent?.location}</span></li>
                            <li className={"list-unstyled d-flex justify-content-between py-1 border-bottom"}><span>Number of Volunteers:</span> <span>{vEvent?.linked_volunteers?.length}</span></li>
                            {
                                vEvent?.mealsServed && (
                                    <li className={"list-unstyled d-flex justify-content-between py-1 border-bottom"}><span>Total Meals Served</span> <span>{vEvent?.mealsServed}</span></li>
                                )
                            }
                        </ul>
                    </Col>
                    <Col  sm={12} lg={6} className={"p-3"}>
                        {vEvent?.images.length === 0 ?
                            null
                         :
                            <>
                                <h2 className={" fw-light text-center"}>Images From the Event</h2>
                                <Container className={"d-flex justify-content-center"}>
                                    <div className={""}>
                                        <ImageListGallery galleryImages={vEvent?.images} />
                                    </div>
                                </Container>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
            <Container>
                <h2 className={"text-center lead fs-1  my-3 py-2"}>Volunteers who participated</h2>
                <p className={"text-center  fs-5 lead"}>We thank our volunteers who helped us make it happen!</p>
                <UserDisplay users={vEvent?.linked_volunteers} areVolunteers={true} />
            </Container>
        </Container>
    )
}
