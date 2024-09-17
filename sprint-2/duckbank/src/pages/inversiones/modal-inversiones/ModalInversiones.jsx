import PropTypes from "prop-types";

const ModalInversiones = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full bg-[#e63946] hover:bg-[#d13440]"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
ModalInversiones.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalInversiones;
