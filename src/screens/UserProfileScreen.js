import React, { useEffect, useState } from "react";
import {Container, Col, Row, Card, Modal, Button} from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MyNavbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import NotAuthenticatedPrompt from "../components/NotAuthenticatedPromt";
import ProfileImageDropzone from "../components/ProfileImageDropzone";
import profileImgDNE from "../assets/images/svg/unknown_user_icon.svg";
import { handleLink } from "../utils/navigationUtils";
import {format, parseISO} from "date-fns";

async function fetchUserProfile(accessToken, userId = null) {
    const endpoint = userId ? `/api/users/profile/${userId}` : '/api/users/profile';
    const headers = accessToken ? { "Authorization": `Bearer ${accessToken}` } : {};
    const response = await fetch(endpoint, { headers });
    return await response.json();
}

async function fetchAssociatedEvents(associatedEvents) {
    const eventIdsString = associatedEvents.join(',');
    const endpoint = `/api/events/volunteering/filter?event_ids=${eventIdsString}`;
    const response = await fetch(endpoint);
    return await response.json();
}
async function fetchAppliedEvents(accessToken, userId) {
    const endpoint = `/api/users/profile/applied-events?userId=${userId}`;
    const headers = {"Authorization": `Bearer ${accessToken}`};
    const response = await fetch(endpoint, { headers });
    return await response.json();
}
export default function UserProfileScreen() {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { id: userId } = useParams();
    const [editing, setEditing] = useState(false);
    const [updatedAboutMe, setUpdatedAboutMe] = useState(userInfo?.about_me || "");
    const [updatedProfilePicture, setUpdatedProfilePicture] = useState(null);
    const [updateResponse, setUpdateResponse] = useState(null);
    const [updateResponseError, setUpdateResponseError] = useState(null);
    const [errorLongAbout, setErrorLongAbout] = useState(null);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (user?.id === parseInt(userId)) {
            navigate('/user-profile');
        }
    }, [user?.id, userId]);

    useEffect(() => {
        async function getUserProfile() {
            if (!user?.token && !userId) {
                return;
            }
            try {
                const token = user?.token;
                const data = await fetchUserProfile(token, userId);
                setUserInfo(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        }
        getUserProfile();
    }, [user?.token, userId]);

    const handleImageUpload = (file) => {
        const feedbackMessage = validateImage(file);
        setFeedback({ type: feedbackMessage === 'Image uploaded successfully!' ? 'success' : 'error', message: feedbackMessage });
        if (feedbackMessage === 'Image uploaded successfully!') {
            setUpdatedProfilePicture(file);
        } else {
            setUpdatedProfilePicture(null);
        }
    };

    const validateImage = (file) => {
        const validTypes = ['.jpg', '.jpeg', '.png'];
        const fileExtension = "." + file.name.split(".").pop();
        if (!validTypes.includes(fileExtension)) {
            return 'Invalid file type. Please upload a JPG or PNG image.';
        }
        if (file.size > 5 * 1024 * 1024) {  // More than 5MB
            return 'Image is too large. Please upload an image smaller than 5MB.';
        }
        return 'Image uploaded successfully!';
    };

    const handleAboutMe = (e) => {
        let textContent = e.currentTarget.textContent;
        textContent = textContent.replace(/<\/?[^>]+(>|$)/g, "");
        const words = textContent.split(/\s+/).filter(Boolean);
        if (words.length > 70) {
            setErrorLongAbout("Your content is too long. Please shorten it.");
            return;
        } else {
            setErrorLongAbout("");
        }
        setUpdatedAboutMe(textContent);
    }

    const handleSaveChanges = async () => {
        setUpdateResponse(null);

        try {
            if (updatedProfilePicture) {
                validateImage(updatedProfilePicture);
            }

            const formData = new FormData();
            formData.append('about_me', updatedAboutMe);
            formData.append('userId', user.id);
            if (updatedProfilePicture) {
                formData.append('profile_picture', updatedProfilePicture);
            }
            const response = await fetch(`/api/users/profile/update`, {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                }
            });
            const responseData = await response.json();
            if (!response.ok){
                setUpdateResponseError(responseData.detail)
            }else{
                setUpdateResponse(responseData.detail);
                setEditing(false);
                // fetching the updated profile again to reflect changes
                const data = await fetchUserProfile(user?.token, userId);
                setUserInfo(data);
            }

        } catch (err) {
            setUpdateResponse(err.message || 'There was an error updating your profile.');
            console.error(err);
        }
    };

    if (!user && !userId) {
        return <NotAuthenticatedPrompt state={{ from: `${location.pathname}` }} prompt={"Please register to view this content."} />;
    }

    return (
        <div className={""}>
            <MyNavbar />
            <Container className={"py-4"} fluid>
                <Row className={"d-flex flex-wrap"}>
                    <Col lg={3} className={"d-flex py-3 flex-column align-items-center text-center"}>
                        <ProfileImage
                            editing={editing}
                            userInfo={userInfo}
                            onImageUpload={handleImageUpload}
                            feedback={feedback}
                        />
                        <p>{userInfo?.community_position}</p>
                        <h4 className={"lead fs-4"}>{userInfo?.first_name} {userInfo?.last_name}</h4>
                        <ProfileAboutMe
                            editing={editing}
                            userInfo={userInfo}
                            handleAboutMe={handleAboutMe}
                            errorLongAbout={errorLongAbout}
                        />
                        <FeedbackMessages
                            feedback={feedback}
                            updateResponse={updateResponse}
                            updateResponseError={updateResponseError}
                        />
                        <ProfileActions
                            location={location}
                            editing={editing}
                            handleSaveChanges={handleSaveChanges}
                            setEditing={setEditing}
                        />
                    </Col>
                    <Col lg={9} className={"px-4"}>
                        <AppliedEventsComponent user={user} location={location} />
                        <Container className={"bg-light shadow-lg py-3 mt-2"}>
                            <h2 className={"fw-light text-center"}>Volunteer Stats:</h2>
                            <ul className={"lead fs-4"}>
                                <li className={"list-unstyled d-flex justify-content-between py-1 border-bottom"}><span>Total Volunteering Time: </span> <span>{userInfo?.total_volunteering_hours} hours</span></li>
                                <li className={"list-unstyled d-flex justify-content-between py-1 border-bottom"}><span>Total Events: </span> <span>{userInfo?.linked_events?.length}</span></li>
                            </ul>
                        </Container>
                        <Container>
                            <h2 className={"text-center fw-light pt-5"}>Verified Events</h2>
                            {!(userInfo?.linked_events?.length === 0) ? (
                                <Container className={"d-flex justify-content-center pt-3"}>
                                    <VolunteerAssociatedEvents eventIds={userInfo?.linked_events} />
                                </Container>
                            ) : (
                                <p className={"text-center"}>User has not volunteered for any events yet.</p>
                            )}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

function ProfileImage({ editing, userInfo, onImageUpload, feedback }) {
    return (
        <Container className={"mb-3"}>
            {editing ? (
                <>
                    <ProfileImageDropzone onImageUpload={onImageUpload} />
                    {feedback && <p className={feedback.type === 'success' ? 'text-success' : 'text-danger'}>{feedback.message}</p>}
                </>
            ) : userInfo?.profile_picture ? (
                <img src={userInfo.profile_picture} className={"rounded-circle img-profile"} alt="Profile Picture"/>
            ) : (
                <img src={profileImgDNE} className={"rounded-circle img-profile"} alt="Profile Picture"/>
            )}
        </Container>
    );
}

function ProfileAboutMe({ editing, userInfo, handleAboutMe, errorLongAbout }) {
    return (
        <Container className={"py-3"}>
            {editing ? (
                <div className="mb-3">
                    <div
                        contentEditable={editing}
                        className="about-me-content border rounded p-2"
                        onBlur={handleAboutMe}
                    >
                        {userInfo?.about_me || "Write about yourself..."}
                    </div>
                </div>
            ) : (
                userInfo?.about_me ?
                    (
                        <p className={"text-center"}>{userInfo?.about_me}</p>
                    ) :
                    (
                        <p className={"text-center"}>Write about yourself..</p>
                    )

            )}
            <p className="text-danger">{errorLongAbout}</p>
        </Container>
    );
}

function FeedbackMessages({ feedback, updateResponse, updateResponseError }) {
    return (
        <>
            <p className={feedback.type}>{feedback.message}</p>
            <p className="text-success">{updateResponse}</p>
            <p className="text-danger">{updateResponseError}</p>
        </>
    );
}

function ProfileActions({ location, editing, handleSaveChanges, setEditing }) {
    if (location.pathname !== "/user-profile") return null;

    return (
        editing ? (
            <button className="btn btn-success" onClick={handleSaveChanges}>
                Save Changes
            </button>
        ) : (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>
                Edit Profile
            </button>
        )
    );
}

const VolunteerAssociatedEvents = (eventIds) => {
    const [associatedEvents, setAssociatedEvents] = useState([]);

    useEffect(() => {
        async function getAssociatedEvents() {
            try {
                const data = await fetchAssociatedEvents(eventIds.eventIds);
                setAssociatedEvents(data);
            } catch (error) {
                console.error('Error fetching user associated events:', error);
            }
        }
        getAssociatedEvents();
    }, [eventIds.eventIds]);
    return (
        <Container className={"my-3 scrolling-wrapper"}>
            {associatedEvents.map((AssEvent) => (
                <Link key={AssEvent.id} onClick={handleLink} to={`/activity/volunteer/${AssEvent.id}`} className="custom-card px-1">
                    <Card className="custom-card scrolling-card">
                        <Card.Img variant="top" src={AssEvent.event_poster} alt={AssEvent.title} />
                        <Card.Body>
                            <Card.Title>{AssEvent.title}</Card.Title>
                            <Card.Text>{AssEvent.datetime}</Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            ))}
        </Container>
    )
};
const AppliedEventsComponent = ({location, user}) => {
    const [appliedEvents, setAppliedEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [applicationId, setApplicationId] = useState(null);
    const [message, setMessage] = useState(null);

    const handleCancelClick = (event, appliedEvent) => {
        event.preventDefault();  // Prevent link from navigating
        setApplicationId(appliedEvent);
        setShowModal(true);
    };

    const handleConfirmCancellation = async () => {
        try {
            const formData = new FormData();
            formData.append('applicationId', applicationId);
            const response = await fetch(`/api/users/withdraw`, {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                }
            });
            const responseData = await response.json();
            setMessage(responseData.detail)
            // Remove the withdrawn event from the appliedEvents array
            const updatedEvents = appliedEvents.filter(event => event.assignment_id !== applicationId);
            setAppliedEvents(updatedEvents);
        } catch (err) {
            setMessage(err.message || 'There was an error withdrawing from the event.');
            console.error(err);
        }
        setShowModal(false);
    };

    useEffect(() => {
        async function getAppliedEvents() {
            try {
                const data = await fetchAppliedEvents(user?.token, user.id);
                setAppliedEvents(data);
            } catch (error) {
                console.error('Error fetching applied vents:', error);
            }
        }
        getAppliedEvents();
    }, [user]);
    if (location.pathname !== "/user-profile") return null;
    return (
        <div className={"py-3 my-2"}>
            <Container className={"bg-light shadow-lg py-3 mt-2"}>
            <h1 className={"fs-2 lead text-center"}>My Upcoming Events</h1>
                <Container className={"my-3"} fluid>
                    <div className={"lead fs-4 w-100"} style={{ maxHeight: '30vh', overflowY: 'auto' }}>
                        {!(appliedEvents?.length === 0) ? (
                            appliedEvents.map((appliedEvent) => (
                                <div key={appliedEvent.assignment_id} className="w-100">
                                    <Link onClick={handleLink} to={`/activity/volunteer/${appliedEvent.volunteering_event_id}`} className="text-decoration-none w-100">
                                        <Card className="mb-3 w-100 fs-5">
                                            <Card.Body className="d-flex justify-content-between align-items-center">
                                                <div className="col-3 text-start">{appliedEvent?.title}</div>
                                                <div className="col-3 text-center">{appliedEvent?.date ? format(parseISO(appliedEvent?.date), 'MMM/dd/yyyy') : ''}</div>
                                                <div className="col-3 text-center">{appliedEvent?.assigned_position}</div>
                                                <div className="col-2 text-center" style={{color: appliedEvent?.approved_participation === true ? "green" : "orange"}}>
                                                    {appliedEvent?.approved_participation === true ? "Approved" : "Pending"}
                                                </div>
                                                <div className="col-1 text-end">
                                                    <Button className={"btn-danger mx-2"} onClick={(event) => handleCancelClick(event, appliedEvent.assignment_id)}>
                                                        ✖
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>

                            ))
                        ) : (
                            <>
                                <p className={"text-center text-muted"}>You do not have any upcoming events.</p>
                                <div className={"d-flex align-items-center justify-content-center"}>
                                    <Link className={"btn btn-outline-info"} to={"/activity/volunteer"}>Volunteer!</Link>
                                </div>
                            </>
                        )}
                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Are you sure you want to withdraw from this event?
                                {message && <p>{message}</p>}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                                <Button variant="danger" onClick={handleConfirmCancellation}>Confirm</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Container>
            </Container>
        </div>
    )
};
