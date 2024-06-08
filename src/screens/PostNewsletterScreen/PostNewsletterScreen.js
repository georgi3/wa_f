
import React from "react";
import {Container} from "react-bootstrap";
import './PostNewsletterScreen.scss';
import MyNavbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import ImageLoader from "../../components/ImageLoader";
import img1 from '../../assets/images/landingPage/landing-page-pic1.jpg';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PostNewsletterScreen (){
    React.useEffect(() => {
        window.gtag('event', 'newsletter-signup' , { 'event_category': 'engagement', 'event_label': 'newsletter-signup', 'value': '1' });
    }, []);

    return(
        <>
            <MyNavbar />
            <Container className={"post-newsletter"}>
                <Container className={"little-box"}>
                    <div className={"newsletter-left-part"}>
                        <ImageLoader className={"newsletter-image"} src={img1} alt={"People lining up for food."} />
                    </div>
                    <div className={"newsletter-right-part"}>
                        <h3>Thank you for registering to our newsletter.</h3>
                        <p>Stay tuned for updates on our latest events, fundraisers, and volunteering opportunities.</p>
                    </div>
                </Container>
            </Container>
            <Footer />
        </>
    )
}