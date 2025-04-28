
import React,{useEffect,useRef} from "react";
import {Container} from "react-bootstrap";
import './PostNewsletterScreen.scss';
import MyNavbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import ImageLoader from "../../components/ImageLoader";
import img1 from '../../assets/images/landingPage/landing-page-pic1.jpg';

export default function PostNewsletterScreen (){
    const textRefs = useRef([]);
    React.useEffect(() => {
        window.gtag('event', 'newsletter-signup' , { 'event_category': 'engagement', 'event_label': 'newsletter-signup', 'value': '1' });
        const animationDurations = [1500, 1500]; 

        textRefs.current.forEach((ref, index) => {
            setTimeout(() => {
                ref.classList.add('typing-started');
                setTimeout(() => {
                    ref.classList.add('typing-finished')
                },animationDurations[index]);
            },index === 0 ? 0 : animationDurations[index - 1]);   
        });
    }, []);

    return(
        <>
            <MyNavbar />
            <div className="newsletter-wrapper">
            <Container className={"post-newsletter"}>
                <Container className={"little-box"}>
                    <div className={"newsletter-left-part"}>
                        <ImageLoader className={"newsletter-image"} src={img1} alt={"People lining up for food."} />
                    </div>
                    <div className={"newsletter-right-part"}>
                        <h3 className="animation" ref={(el)=>textRefs.current[0]=el}>Thank you for registering to our newsletter!</h3>
                        <p className="animation" ref={(el)=>textRefs.current[1]=el}>Stay tuned for updates on our latest events, fundraisers, and volunteering opportunities.</p>
                    </div>
                </Container>
            </Container>
            <Footer />
            </div>    
        </>
    )
}