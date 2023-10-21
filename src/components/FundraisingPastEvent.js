import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {format, parseISO} from "date-fns";
import SocialMediaLinks from "./SocialMediaLinks";
import ImageListGallery from "./gallery/ImageListGallery";
import NotFound from "./404";

export default function FundraisingPastEvent({ frEvent }){
    const shouldRenderPastEvent = frEvent?.imgHero && frEvent?.par1;
    if (!shouldRenderPastEvent){
        return (<NotFound />)
    }

    return (
        <>
            {
                frEvent?.imgHero &&  <HeroOverlay frEvent={frEvent} />
            }
            <Container fluid>
                <Container>
                    <Row className={"d-flex flex-row"}>
                        <Col className={"p-3 mt-2"} sm={12} lg={6}>
                            {
                                frEvent?.par1 && (
                                    <>
                                        <h2 className={"fw-light text-lg-start"}><span className={"border-decor"}>Event Summary</span></h2>
                                        <p className={"lead fs-4 "}>{frEvent?.par1}</p>
                                    </>
                                )
                            }
                            {
                                Boolean(frEvent?.socialMediaList?.length) && (
                                    <Container>
                                        <p className={"text-info lead text-center"}>See more in our social media</p>
                                        <SocialMediaLinks socials={frEvent?.socialMediaList} />
                                    </Container>
                                )
                            }
                        </Col>
                        <Col  sm={12} lg={6} className={"p-3"}>
                            {frEvent?.images.length === 0 ?
                                null
                                :
                                <>
                                    <h2 className={" fw-light text-center"}>Images From the Event</h2>
                                    <Container className={"d-flex justify-content-center"}>
                                        <div className={""}>
                                            <ImageListGallery galleryImages={frEvent?.images} />
                                        </div>
                                    </Container>
                                </>
                            }
                        </Col>
                        <Col  sm={12} lg={6} className={"p-3"}>
                            <p className={"lead fs-4 "} style={{"textAlign": "justify"}}>{frEvent?.par2}</p>
                            <p className={"lead fs-4 "} style={{"textAlign": "justify"}}>{frEvent?.par3}</p>
                        </Col>
                        <Col  sm={12} lg={6} className={"p-3"}>
                            <p className={"lead fs-4 "} style={{"textAlign": "justify"}}>{frEvent?.par4}</p>
                            <p className={"lead fs-4 "} style={{"textAlign": "justify"}}>{frEvent?.par5}</p>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}


function HeroOverlay({frEvent}) {
    return (
        <div className="hero-overlay shadow-lg" style={{ backgroundImage: `url(${frEvent?.imgHero})`}}>
            <Container>
                <Row>
                    <Col className={"hero-text"}>
                        <h1 className={"fs-1 lead"}>{frEvent?.title}</h1>
                        <p className={"fs-4 lead"}>{frEvent?.datetime ? format(parseISO(frEvent?.datetime), 'MMM dd, yyyy') : ''}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}