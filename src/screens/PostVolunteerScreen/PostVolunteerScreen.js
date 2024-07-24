
import React from "react";
import {Container} from "react-bootstrap";
import './PostVolunteerScreen.scss';
import MyNavbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import ImageLoader from "../../components/ImageLoader";
import img1 from '../../assets/images/landingPage/landing-page-pic1.jpg';

export default function PostVolunteerScreen (){
    React.useEffect(() => {
        window.gtag('event', 'volunteer-signup' , { 'event_category': 'engagement', 'event_label': 'volunteer-signup', 'value': '1' });
    }, []);

    return(
        <>
            <MyNavbar />
            <Container className={"post-volunteer"}>
                <Container className={"little-box"}>
                    <div className={"volunteer-left-part"}>
                        <ImageLoader className={"volunteer-image"} src={img1} alt={"People lining up for food."} />
                    </div>
                    <div className={"volunteer-right-part"}>
                        <h3>Thank you for registering to our volunteer.</h3>
                        <p>Stay tuned for updates on our latest events, fundraisers, and volunteering opportunities.</p>
                    </div>
                </Container>
            </Container>
            <Footer />
        </>
    )
}