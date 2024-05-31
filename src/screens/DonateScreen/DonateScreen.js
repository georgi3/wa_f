import React from "react";
import MyNavbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import missionVideo from '../../assets/videos/landingPage/mission.mp4';
import donationVideo from '../../assets/videos/landingPage/donation.mp4';
import landingPagePic1 from '../../assets/images/landingPage/landing-page-pic1.jpg';
import landingPagePic2 from '../../assets/images/landingPage/landing-page-pic2.png';
import './DonateScreen.scss';


export default function DonateScreen(){
    return (
        <>
            <MyNavbar />
            <div className="landing-screen">
                <div className="landing-screen__container">
                    <div className="content">
                        <div className="mission">
                            <div className="video-wrapper">
                                <h1>OUR MISSION: FOOD, YOUTH ENGAGEMENT, & COMMUNITY</h1>
                                <video autoPlay muted loop>
                                    <source src={missionVideo} type="video/mp4"/>
                                </video>
                                <button className={"keela-popup-button dbox-donation-button donate-btn"} data-src="https://give-can.keela.co/embed/ERKCBbEw2WicFxhch">Donate</button>
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
                                    <button className={"keela-popup-button dbox-donation-button donate-btn"} data-src="https://give-can.keela.co/embed/ERKCBbEw2WicFxhch">Donate</button>
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
                                <div className="donation-benifits">
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
                            </div>
                        </div>

                    </div>
                </div>
            </div>
           <Footer />
        </>
    )
}