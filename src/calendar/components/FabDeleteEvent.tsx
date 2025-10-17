import { useEffect, useState } from "react";
import { useUiStore, useCalendarStore } from "../../hooks";

export const FabDeleteEvent = () => {
    const { handleStartDeletingEvent, hasEventSelected } = useCalendarStore();
    const { isDateModalOpen } = useUiStore();

    const [canShow, setCanShow] = useState(false);

    useEffect(() => {
        if (!isDateModalOpen) {
            const timeout = setTimeout(() => setCanShow(true), 250); //! closeTimeoutMS of the modal
            return () => clearTimeout(timeout);
        } else {
            setCanShow(false);
        }
    }, [isDateModalOpen]);

    if (!hasEventSelected || !canShow) return null;

    return (
        <button className="btn btn-danger fab fab-danger" onClick={handleStartDeletingEvent}>
            <i className="fas fa-trash-alt"></i>
        </button>
    );
};
