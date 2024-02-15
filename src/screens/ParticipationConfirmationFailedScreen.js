import React from "react";
import {Container} from "react-bootstrap";
import MyNavbar from "../components/Navbar";
export default function ParticipationConfirmationFailedScreen(){

    return (
        <>
            <MyNavbar />
            <Container className={"fs-2 text-center py-5  my-4"}>
                Unfortunately your participation confirmation has failed due to some technical difficulties. Please
                reply to our team manually. Sorry for the inconvenience.
            </Container>
        </>

    )
}
