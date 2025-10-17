import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2'
import Modal from 'react-modal';
import DatePicker, {
  registerLocale,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';

registerLocale('es', es)

// Estilos del modal, otros estilos en index.css
const customStyles: ReactModal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '550px',
    maxHeight: '85vh',
    transform: 'translate(-50%, -50%)',
    borderRadius: '16px',
    padding: '2rem 2.5rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    background: '#fff',
    overflowY: 'auto',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(3px)',
    zIndex: 1000,
  },
};


Modal.setAppElement('#root');

export const CalendarModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore();

  const [formSubmitted, setFormSubmitted] = useState(false)
  const { activeEvent, startSavingEvent, setActiveEvent } = useCalendarStore();

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: new Date(),
  });

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({
        ...activeEvent,
        start: new Date(activeEvent.start),
        end: new Date(activeEvent.end),
      });
    }
  }, [activeEvent]);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';

    return (formValues.title.length > 0)
      ? ''
      : 'is-invalid';
  },
    [formValues.title, formSubmitted]);

  const onDateChange = (event: Date | null, changing: 'start' | 'end') => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onInputChange = (
    { target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });

    // console.log({ formValues });
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      console.log('error en fechas');
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
      return;
    }

    if (formValues.title.length <= 0) return;
    // console.log(formValues);
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  }

  const onCloseDateModal = () => {
    closeDateModal();
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseDateModal}
      onAfterClose={() => setActiveEvent(null)} // 🔹 limpia el evento cuando ya terminó la animación
      closeTimeoutMS={200}
      style={customStyles}
      overlayClassName="modal-fondo"
    >
      <h2 className="text-center mb-4 fw-bold text-primary">
        {activeEvent?._id || activeEvent?._id ? 'Editar evento' : 'Nuevo evento'}
      </h2>

      <form onSubmit={onSubmit} className="needs-validation">
        {/* Fecha inicio */}
        <div className="mb-3">
          <label className="form-label fw-semibold d-block">Fecha y hora de inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(e) => onDateChange(e, 'start')}
            dateFormat="Pp"
            showTimeSelect
            locale={es}
            timeCaption="Hora"
            className="form-control"
          />
        </div>

        {/* Fecha fin */}
        <div className="mb-3">
          <label className="form-label fw-semibold d-block">Fecha y hora de fin</label>
          <DatePicker
            selected={formValues.end}
            onChange={(e) => onDateChange(e, 'end')}
            dateFormat="Pp"
            showTimeSelect
            locale={es}
            timeCaption="Hora"
            minDate={formValues.start}
            className="form-control"
          />
        </div>


        <hr className="my-4" />

        {/* Título */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Título del evento</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            name="title"
            placeholder="Ej. Cumpleaños del jefe"
            value={formValues.title}
            onChange={onInputChange}
          />
        </div>

        {/* Notas */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Notas</label>
          <textarea
            name="notes"
            rows={4}
            className="form-control"
            placeholder="Detalles adicionales del evento"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
        </div>

        {/* Botones */}
        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCloseDateModal}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="far fa-save me-2"></i>Guardar
          </button>
        </div>
      </form>
    </Modal>
  );
}
