
import React from "react";
import "../PostActionScreen.scss";
import MyNavbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import PostActionLayout from "../../components/PostActionLayout";
import img1 from '../../assets/images/landingPage/landing-page-pic1.jpg';

export default function PostVolunteerScreen (){
    React.useEffect(() => {
        window.gtag('event', 'volunteer-signup' , { 'event_category': 'engagement', 'event_label': 'volunteer-signup', 'value': '1' });
    }, []);

    return(
        <>
            <MyNavbar />
            <PostActionLayout imageSrc={img1} imageAlt={"People lining up for food."}>
                <h3 className="post-action__title">Thank you for registering to our volunteer.</h3>
                <p className="post-action__text">Stay tuned for updates on our latest events, fundraisers, and volunteering opportunities.</p>
            </PostActionLayout>
            <Footer />
        </>
    )
}