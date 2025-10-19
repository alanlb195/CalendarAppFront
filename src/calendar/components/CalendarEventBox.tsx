
export const CalendarEventBox = ( props: any ) => {

    const { title, event } = props;
    
    return (
        <>
            <strong>{title}</strong>
            <span> - {event.user.name}</span>
        </>
    )
}
