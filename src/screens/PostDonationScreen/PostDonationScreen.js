import React from "react";
import {Container} from "react-bootstrap";
import './PostDonationScreen.scss';
import MyNavbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import ImageLoader from "../../components/ImageLoader";
import img1 from '../../assets/images/landingPage/landing-page-pic1.jpg';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PostDonationScreen (){
    React.useEffect(() => {
        window.gtag('event', 'submit-donation' , { 'event_category': 'engagement', 'event_label': 'donation', 'value': '1' });
    }, []);

    return(
        <>
            <MyNavbar />
            <Container className={"post-donation"}>
                <Container className={"little-box"}>
                    <div className={"donation-left-part"}>
                        <ImageLoader className={"donation-image"} src={img1} alt={"People lining up for food."} />
                    </div>
                    <div className={"donation-right-part"}>
                        <h3>Thank you for your generous donation.</h3>
                        <p>Your contribution brings us closer to a world where everyone can access the necessary resources to thrive.</p>
                        <Container className={"share-donation"}>
                            <Container className={"social-media-icons"}>
                                <a href={"https://www.facebook.com/sharer/sharer.php?u=https://welfareavenue.com&quote=Just+made+a+donation+through+WelfareAvenue!+Feels+amazing+to+give+back+and+support+such+a+great+cause.+Join+me+in+making+a+difference+today!+%F0%9F%8C%9F+%23GivingBack+%23WelfareAvenue"} target={"_blank"} rel={"noreferrer"}>
                                    <i className={"fab fa-facebook"}><FontAwesomeIcon icon={faFacebook} /></i>
                                </a>
                                <a href={"https://www.instagram.com/welfareavenue/"} target={"_blank"} rel={"noreferrer"}>
                                    <i className={"fab fa-instagram"}><FontAwesomeIcon icon={faInstagram} /></i>
                                </a>
                                <a href={"https://www.linkedin.com/feed?text=Just+made+a+donation+through+WelfareAvenue!+Feels+amazing+to+give+back+and+support+such+a+great+cause.+Join+me+in+making+a+difference+today!+%F0%9F%8C%9F+%23GivingBack+%23WelfareAvenue"} target={"_blank"} rel={"noreferrer"}>
                                    <i className={"fab fa-linkedin"}><FontAwesomeIcon icon={faLinkedin} /></i>
                                </a>
                                <a href={"https://x.com/intent/post?text=Just+made+a+donation+through+WelfareAvenue!+Feels+amazing+to+give+back+and+support+such+a+great+cause.+Join+me+in+making+a+difference+today!+%F0%9F%8C%9F+%23GivingBack+%23WelfareAvenue"} target={"_blank"} rel={"noreferrer"}>
                                    <i className={"fab fa-twitter"}><FontAwesomeIcon icon={faTwitter} /></i>
                                </a>
                            </Container>
                        </Container>
                    </div>
                </Container>
            </Container>
            <Footer />
        </>
    )
}