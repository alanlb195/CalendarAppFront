import { useDispatch, useSelector } from "react-redux"
import { onOpenDateModal, onCloseDateModal, type AppDispatch, type RootState } from "../store"


export const useUiStore = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { isDateModalOpen } = useSelector((state: RootState) => state.ui)

    const openDateModal = () => dispatch(onOpenDateModal())
    const closeDateModal = () => dispatch(onCloseDateModal())


    return {
        //* Properties
        isDateModalOpen,

        //* Methods
        openDateModal,
        closeDateModal,
    }

}