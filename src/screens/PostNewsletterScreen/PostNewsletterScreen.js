
import React, { useRef } from "react";
import "../PostActionScreen.scss";
import "./PostNewsletterScreen.scss";
import MyNavbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import PostActionLayout from "../../components/PostActionLayout";
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
                <PostActionLayout
                    wrapperClassName="post-action--newsletter"
                    imageClassName="post-action__image--rounded"
                    imageSrc={img1}
                    imageAlt={"People lining up for food."}
                >
                    <h3 className="post-action__title animation" ref={(el)=>textRefs.current[0]=el}>Thank you for registering to our newsletter!</h3>
                    <p className="post-action__text animation" ref={(el)=>textRefs.current[1]=el}>Stay tuned for updates on our latest events, fundraisers, and volunteering opportunities.</p>
                </PostActionLayout>
                <Footer />
            </div>    
        </>
    )
}