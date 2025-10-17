
// interface Event {
//     bgColor: string;
//     end: string;
//     title: string;
//     notes: string;
//     start: string;
//     user: { _id: string, name: string }   
// }

// interface Props {
//     title: string;
//     event: Event;
// }

export const CalendarEventBox = ( props: any ) => {

    const { title, event } = props;

    // console.log(event);
    

    return (
        <>
            <strong>{title}</strong>
            <span> - {event.user.name}</span>
        </>
    )
}
