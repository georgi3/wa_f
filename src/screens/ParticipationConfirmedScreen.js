import React from "react";
import {Container} from "react-bootstrap";
import MyNavbar from "../components/Navbar";
export default function ParticipationConfirmedScreen(){

    return (
        <>
            <MyNavbar />
            <Container className={"fs-2 text-center py-5  my-4"}>
                Thank you for confirming your participation!
            </Container>
        </>

    )
}
