import React from "react";
import {Container, Col, Row} from "react-bootstrap";

export function Partners({ partners }) {
    return (
        <div className={"moving-section"}>
        <Row className="w-100 m-0 py-0 d-flex flex-nowrap moving-content">
            {partners.map((partner) => (
                <Col key={partner.id} sm={8} md={8} lg={6} xl={4}>
                    <Container className="my-3 p-0 border-0 zoom">
                        <a
                            href={partner.url}
                            target="_blank"
                            className="d-flex align-content-center justify-content-center"
                        >
                            <img
                                className={"svg-shadow"}
                                src={partner.img}
                                alt={partner.name}
                                style={{ height: 180, width: 180 }}
                            />
                        </a>
                    </Container>
                </Col>
            ))}
        </Row>
        </div>
    );
}


