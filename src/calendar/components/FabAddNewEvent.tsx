import { addHours } from "date-fns";
import { useUiStore } from "../../hooks"
import { useCalendarStore } from "../../hooks/useCalendarStore";


export const FabAddNewEvent = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();


    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Alan'
            }
        });
        openDateModal();
    }

    return (
        <button className="btn btn-primary fab fab-primary" onClick={handleClickNew}>
            <i className="fas fa-plus"></i>
        </button>
    )
}
