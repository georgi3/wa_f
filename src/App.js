import './App.css';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import {Container} from "react-bootstrap";
import {HomeScreen} from "./screens/Home/HomeScreen";
import {AboutScreen} from "./screens/AboutScreen";
import {GalleryScreen} from "./screens/GalleryScreen";
import React, {useEffect} from "react";
import VolunteeringEventScreen from "./screens/VolunteeringEventScreen";
import SignUpScreen from "./screens/UserAuth/SignUpScreen";
import SignInScreen from "./screens/UserAuth/SignInScreen";
import PressScreen from "./screens/PressScreen";
import DonateScreen from "./screens/DonateScreen";
import VolunteeringScreen from "./screens/VolunteeringScreen";
import ActivityScreen from "./screens/ActivityScreen";
import WeeklyVolunteering from "./screens/WeeklyVolunteering";
import ClubVolunteering from "./screens/ClubVolunteering";
import EssentialsDonationScreen from "./screens/EssentialsDonationScreen";
import FundraiserScreen from "./screens/FundraiserScreen";
import FundraiserEventScreen from "./screens/FundraiserEventScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import { AuthProvider } from "./context/AuthContext";
import LoginCallback from "./components/LoginCallback";
import RequestPasswordReset from "./screens/UserAuth/RequestPasswordReset";
import PasswordResetConfirm from "./components/PasswordResetConfirm";
import NotFound from "./components/404";
import LandingScreen from "./screens/LandingScreen/LandingScreen";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
  return (
      <BrowserRouter>
          <ScrollToTop />
          <AuthProvider>
              <Container className="w-100 p-0 m-0" fluid>
                  <Routes>
                      <Route path="/" element={<HomeScreen />} exact/>
                      <Route path="/about" element={<AboutScreen />} />
                      <Route path="/about/gallery" element={<GalleryScreen />}/>
                      <Route path="/activity" element={<ActivityScreen />}/>
                      <Route path="/activity/volunteer" element={<VolunteeringScreen />}/>
                      <Route path="/activity/volunteer/:id" element={<VolunteeringEventScreen />}/>
                      <Route path="/activity/weekly-volunteering" element={<WeeklyVolunteering />}/>
                      <Route path="/activity/fundraising" element={<FundraiserScreen />} />
                      <Route path="/activity/fundraising/:id" element={<FundraiserEventScreen />} />
                      <Route path="/activity/club-volunteering" element={<ClubVolunteering />}/>
                      <Route path="/activity/donate-essentials" element={<EssentialsDonationScreen />}/>
                      <Route path="/app-landing-page" element={<LandingScreen />} />
                      <Route path="/press" element={<PressScreen />}/>
                      <Route path="/donate" element={<DonateScreen />}/>
                      <Route path="/signup" element={<SignUpScreen  />}/>
                      <Route path="/signin" element={<SignInScreen  />}/>
                      <Route path="/user-profile" element={<UserProfileScreen />}>
                          <Route path=":id" element={<UserProfileScreen />} />
                      </Route>
                      <Route path="/login/callback" element={<LoginCallback />} />
                      <Route path="/password/request-reset/" element={<RequestPasswordReset />} exact/>
                      <Route path="/password-reset/done/:uid/:token/" element={<PasswordResetConfirm />} exact/>
                      <Route path="*" element={<NotFound />} />
                  </Routes>
              </Container>
          </AuthProvider>
      </BrowserRouter>
  );
}
export default App;
