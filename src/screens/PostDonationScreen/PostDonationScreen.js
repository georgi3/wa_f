import React from "react";
import {Container} from "react-bootstrap";
import "../PostActionScreen.scss";
import MyNavbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import PostActionLayout from "../../components/PostActionLayout";
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
            <PostActionLayout imageSrc={img1} imageAlt={"People lining up for food."}>
                <h3 className="post-action__title">Thank you for your generous donation.</h3>
                <p className="post-action__text">Your contribution brings us closer to a world where everyone can access the necessary resources to thrive.</p>
                <Container className="post-action__share">
                    <Container className="post-action__social-icons">
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
            </PostActionLayout>
            <Footer />
        </>
    )
}