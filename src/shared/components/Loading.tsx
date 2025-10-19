import "./Loading.css";

export const Loading = () => {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p className="loading-text">Cargando...</p>
        </div>
    );
};
