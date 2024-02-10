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

import { quantum } from 'ldrs'
import { VideoLoader } from "../components/VideoLoader";

quantum.register()

async function fetchGalleries() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/content/galleries`);
    return await response.json();
}

// Implement loading p

export function GalleryScreen(){
    const [galleries, setGalleries] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchGalleries();
                setGalleries(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    return (
        <>
            <MyNavbar />
            <Container className={"my-3"} fluid>
                <Link to={"/about"} className={"btn btn-lg btn-outline-info rounded m-3 py-1 px-3 position-fixed"}
                      style={{"zIndex": "9"}}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Go Back
                </Link>
                <h1 className={"text-center text-info fw-light my-5"}>WelfareAvenue Videos</h1>

                <Carousel className={"m-lg-5 p-lg-5 mt-5 pt-3 d-flex justify-content-center align-content-center"}
                          style={{"height": "80vh"}}>
                    <Carousel.Item>
                        <VideoLoader src={vid1} className={"img-fluid"} controls autoPlay loop muted />
                        <Carousel.Caption className={"text-light"}>
                            {/* <h3>Optional Title</h3>
                            <p>Optional Text</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <VideoLoader src={vid2} className={"img-fluid"} controls autoPlay loop muted />
                        <Carousel.Caption className={"text-light"}>
                            {/* <h3>Dummy Title</h3>
                            <p>Dummy Text</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <VideoLoader src={vid3} className={"img-fluid"} controls autoPlay loop muted />
                        <Carousel.Caption className={"text-light"}>
                            {/* <h3>Dummier Title</h3>
                            <p>Dummier Text</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <h1 className={"text-center text-info fw-light mb-5"}>WelfareAvenue Photos</h1>
                <Accordion className={"mx-lg-5 px-lg-5 d-flex flex-column justify-content-center align-content-center text-center"}
                    defaultActiveKey={galleries[0]?.name} style={{backgroundColor: "none"}} flush>
                    {Galleries(galleries, loading, error)}
                </Accordion>
            </Container>
        </>
    )
}

function Galleries(galleries, loading, error) {
        return(
            <div className="w-100 d-flex justify-content-center text-center align-items-center">
                {loading && <l-quantum size="85" speed="1.75" color="#711d94"></l-quantum>}
                {error && <p className={"text-danger"}>{error}</p>}
                {!loading && !galleries.length && <p className={"text-info text-center"}>No photos available</p>}
                {galleries.map(gallery => {
                <Accordion.Item eventKey={gallery?.name}>
                    <Accordion.Header>{gallery?.name}</Accordion.Header>
                    <Accordion.Body>
                        <ImageListGallery galleryImages={gallery?.images} />
                    </Accordion.Body>
                </Accordion.Item>
                })}
            </div>
        )
}