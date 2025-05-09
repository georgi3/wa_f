import {useState} from "react";
import VolunteerApplicationModal from "./VolunteerApplication";

function VolunteerPositionLink({ positionName, positionsLeft, applicationCount, positionLimit, eventId }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const handleApplyClick = (position) => {
        setSelectedPosition(position);
        setModalOpen(true);
    };
    return (
        positionsLeft <= 0 || applicationCount >= (positionLimit+3) ?  (
            <div className="d-flex justify-content-between border-bottom py-2 text-decoration-none">
                <span>{positionName}:</span>
                <span className="text-muted light">Positions Filled</span>
            </div>
        ) : (
            <>
                <div
                    onClick={() => handleApplyClick(positionName)}
                    className="d-flex justify-content-between border-bottom py-2 text-decoration-none"
                    style={{ "cursor": "pointer" }}
                >
                    <span style={{ flex: "1", textAlign: "left" }}>{positionName}:</span>
                    <span style={{ flex: "1", textAlign: "center" }}>{positionsLeft}</span>
                    <span className="btn btn-outline-info" style={{ flexShrink: "0" }}>Apply</span>
                </div>
                <VolunteerApplicationModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    positionNamePlural={selectedPosition}
                    eventId={eventId}
                />
            </>
        )

    );
}



export default VolunteerPositionLink;
