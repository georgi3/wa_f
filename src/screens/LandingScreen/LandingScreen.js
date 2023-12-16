import logo from '../../assets/images/logo.webp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faGoogle,
    faLinkedin,
    faTiktok
} from "@fortawesome/free-brands-svg-icons";
import missionVideo from '../../assets/videos/landingPage/mission.mp4';
import donationVideo from '../../assets/videos/landingPage/donation.mp4';
import landingPagePic1 from '../../assets/images/landingPage/landing-page-pic1.jpg';
import landingPagePic2 from '../../assets/images/landingPage/landing-page-pic2.png';
import './LandingScreen.scss';
import ContactForm from '../../components/ContactForm/ContactForm';
import { Helmet } from 'react-helmet';

export default function LandingScreen(){
    return (
        <>
            <Helmet>
                <script type="text/javascript" defer src="https://donorbox.org/install-popup-button.js"> </script>
                <script type="text/javascript" defer src="https://donorbox.org/install-popup-button.js"> </script>
                {/* Facebook Pixel Code */}
                <script>
                {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '255991413906212'); 
                fbq('track', 'PageView');
                document.querySelectorAll('.donate-btn').forEach((a) => {
                    a.addEventListener('click', () => {
                        fbq('track', 'Donate');
                    });
                })
                `}
                </script>
                {/* End Facebook Pixel Code */}
                {/* Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-SZR7BLYZT1"></script>
                <script>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-SZR7BLYZT1');
                `}
                </script>
                {/* End Google Analytics */}
            </Helmet>
            <div className="landing-screen">
                <div className="landing-navbar">
                    <a target="_blank" rel="noreferrer" href="/">
                        <div className="landing-navbar__logo">
                            <img src={logo} alt="Logo" width="60" height="60"/>
                        </div>
                        <div className="landing-navbar__header">
                            Welfare Avenue
                        </div>
                    </a>
                </div>
                    
                <div className="landing-screen__container">
                    <div className="content">
                        <div className="mission">
                            <div className="video-wrapper">
                                <h1>OUR MISSION: FOOD, YOUTH ENGAGEMENT, & COMMUNITY</h1>
                                <video autoPlay muted loop>
                                    <source src={missionVideo} type="video/mp4"/>
                                </video>
                                <a className="dbox-donation-button donate-btn" href="https://donorbox.org/tis-the-season-of-giving-1">Donate</a>
                            </div>
                        </div>

                        <div className="section" id="giving-season">
                            <div className="header">
                                <h1>Tis the season of <span>giving</span>!</h1>
                            </div>

                            <div className="content">
                                <div className="left-part">
                                    <p>
                                        Every donation helps us provide the essentials for children and families in need.
                                        <br></br>
                                        <br></br>
                                        <span>engaged students</span> from all around montreal go out weekly to serve nutritional <span>homemade meals</span> following the canadian food health guide.
                                        <br></br>
                                        <br></br>
                                        dedicated team of students
                                    </p>
                                    <a className="dbox-donation-button donate-btn" href="https://donorbox.org/tis-the-season-of-giving-1">Donate</a>
                                </div>
                                <div className="right-part">
                                    <img src={landingPagePic1} alt="People lining up for food."></img>
                                </div>
                            </div>
                        </div>

                        <div className="section" id="solo-img">
                            <img src={landingPagePic2} alt="People lining up for food."></img>
                        </div>

                        <div className="section" id="donation-form-conatiner">
                            <div className="header">
                                <h1>Your <span>donation</span>, our <span>mission</span></h1>
                            </div>

                            <div className="content">
                                <div className="left-part donation-benifits">
                                    <p>making a donation</p>
                                    <br></br>
                                    <ol>
                                        <li>your contribution amount</li>
                                        <li>Monthly or one-time</li>
                                        <li>Choose a category where your funds go to</li>
                                        <li>Make it in honor of someone (optional)</li>
                                        <li>Join our donor wall</li>
                                        <li>Stay connected with newsletters</li>
                                    </ol>

                                    <video controls>
                                        <source src={donationVideo} type="video/mp4"/>
                                    </video>
                                </div>

                                <div className="right-part donation-benifits">
                                    <script src="https://donorbox.org/widget.js" paypalexpress="false"></script>
                                    <iframe title="donorbox" src="https://donorbox.org/embed/tis-the-season-of-giving-1?default_interval=o&enable_auto_scroll=false" name="donorbox" allowpaymentrequest="allowpaymentrequest" frameBorder="0" allowtransparency="true" />
                                </div>
                            </div>
                        </div>

                        <div className="section" id="contact-us">
                            <div className="header">
                                <h1>Stay Connected: Sign Up For Our Giving Circle Newsletters</h1>
                            </div>

                            <div className="content">
                                <ContactForm />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="footer">
                    <div className="container">
                        <div className="media">
                            <div className="media__item">
                                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/welfareavenue/">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>
                            <div className="media__item">
                                <a target="_blank" rel="noreferrer" href="https://www.google.com/search?q=welfare+avenue">
                                    <FontAwesomeIcon icon={faGoogle} />
                                </a>
                            </div>
                            <div className="media__item">
                                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/welfareavenue/">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            </div>
                            <div className="media__item">
                                <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@welfareavenue?lang=en">
                                    <FontAwesomeIcon icon={faTiktok} />
                                </a>
                            </div>
                        </div>
                        <div className="copyright">
                            Copyright © Welfare Avenue 2023
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}