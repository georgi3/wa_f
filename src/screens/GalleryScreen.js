import React, {useEffect, useState} from "react";
import {Container, Accordion, Carousel} from "react-bootstrap";
import {Link} from "react-router-dom"
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import MyNavbar from "../components/Navbar";
import vid1 from "../assets/images/about/gallery/videos/1.mp4";
import vid2 from "../assets/images/about/gallery/videos/2.MOV";
import vid3 from "../assets/images/about/gallery/videos/3.mp4";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ImageListGallery from "../components/gallery/ImageListGallery";

async function fetchGalleries() {
    const response = await fetch(`/api/content/galleries`);
    return await response.json();
}

export function GalleryScreen(){
    const [galleries, setGalleries] = useState([]);

    useEffect(() => {
        (async() => {
            const data = await fetchGalleries();
            setGalleries(data);
        })()
    }, []);
    // notes for video section:
    // 1. turn it into a loop
    // 2. only first video should have autoPlay
    // 3. add text?
    return (
        <>
            <MyNavbar />
            <Container className={"my-3"} fluid>
                <Link to={"/about"} className={"btn btn-lg btn-outline-info rounded m-3 p-1 mt-5 position-fixed"}
                      style={{"z-index": "9"}}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Go Back
                </Link>
                <h1 className={"text-center text-info fw-light mb-5"}>WelfareAvenue Videos</h1>

                <Carousel data-interval="false"
                          className={"m-lg-5 p-lg-5 mt-5 pt-3 d-flex justify-content-center align-content-center"}
                          style={{"height": "80vh"}}>
                    <Carousel.Item>
                        <video controls autoPlay preload loop className={"img-fluid"}>
                            <source src={vid1} type="video/mp4"/>
                                Your browser does not support the video tag.
                        </video>
                        <Carousel.Caption className={"text-light"}>
                            <h3>Optional Title</h3>
                            <p>Optional Text</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <video controls preload loop className={"img-fluid"}>
                            <source src={vid2} type="video/mp4"/>
                                    Your browser does not support the video tag.
                        </video>
                        <Carousel.Caption className={"text-light"}>
                            <h3>Dummy Title</h3>
                            <p>Dummy Text</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <video controls preload loop className={"img-fluid"}>
                            <source src={vid3} type="video/mp4"/>
                                    Your browser does not support the video tag.
                        </video>
                        <Carousel.Caption className={"text-light"}>
                            <h3>Dummier Title</h3>
                            <p>Dummier Text</p>

                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <h1 className={"text-center text-info fw-light mb-5"}>WelfareAvenue Photos</h1>
                <Accordion className={"mx-lg-5 px-lg-5 d-flex flex-column justify-content-center align-content-center"}
                    defaultActiveKey={galleries[0]?.name} style={{backgroundColor: "none"}} flush>
                    {
                        galleries.map(gallery => {
                            return(
                                <Accordion.Item eventKey={gallery?.name}>
                                    <Accordion.Header>{gallery?.name}</Accordion.Header>
                                    <Accordion.Body>
                                        <ImageListGallery galleryImages={gallery?.images} />
                                    </Accordion.Body>
                                </Accordion.Item>
                            )})
                    }
                </Accordion>
            </Container>
        </>
    )
}