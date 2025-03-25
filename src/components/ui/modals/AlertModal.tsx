import { AlertType } from "@/types/allType";
import { Modal } from ".";


interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: AlertType;
}

const alertTypes = {
  success: {
    bgColor: "fill-success-50",
    iconColor: "fill-success-600",
    title: "Succès !",
    description: "L'opération a été réalisée avec succès.",
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.9375 19.0004C5.9375 11.7854 11.7864 5.93652 19.0014 5.93652C26.2164 5.93652 32.0653 11.7854 32.0653 19.0004C32.0653 26.2154 26.2164 32.0643 19.0014 32.0643C11.7864 32.0643 5.9375 26.2154 5.9375 19.0004ZM19.0014 2.93652C10.1296 2.93652 2.9375 10.1286 2.9375 19.0004C2.9375 27.8723 10.1296 35.0643 19.0014 35.0643C27.8733 35.0643 35.0653 27.8723 35.0653 19.0004C35.0653 10.1286 27.8733 2.93652 19.0014 2.93652ZM24.7855 17.0575C25.3713 16.4717 25.3713 15.522 24.7855 14.9362C24.1997 14.3504 23.25 14.3504 22.6642 14.9362L17.7177 19.8827L15.3387 17.5037C14.7529 16.9179 13.8031 16.9179 13.2173 17.5037C12.6316 18.0894 12.6316 19.0392 13.2173 19.625L16.657 23.0647C16.9383 23.346 17.3199 23.504 17.7177 23.504C18.1155 23.504 18.4971 23.346 18.7784 23.0647L24.7855 17.0575Z"
      />
    ),
  },
  error: {
    bgColor: "fill-error-50",
    iconColor: "fill-error-600",
    title: "Erreur !",
    description: "Une erreur est survenue. Veuillez réessayer.",
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.9375 19.0004C5.9375 11.7854 11.7864 5.93652 19.0014 5.93652C26.2164 5.93652 32.0653 11.7854 32.0653 19.0004C32.0653 26.2154 26.2164 32.0643 19.0014 32.0643C11.7864 32.0643 5.9375 26.2154 5.9375 19.0004ZM19.0014 2.93652C10.1296 2.93652 2.9375 10.1286 2.9375 19.0004C2.9375 27.8723 10.1296 35.0643 19.0014 35.0643C27.8733 35.0643 35.0653 27.8723 35.0653 19.0004C35.0653 10.1286 27.8733 2.93652 19.0014 2.93652ZM24.7855 15.7855C25.3713 16.3713 25.3713 17.321 24.7855 17.9068L20.7218 21.9705L24.7855 26.0342C25.3713 26.62 25.3713 27.5698 24.7855 28.1555C24.1997 28.7413 23.25 28.7413 22.6642 28.1555L18.6005 24.0918L14.5368 28.1555C13.951 28.7413 13.0013 28.7413 12.4155 28.1555C11.8297 27.5698 11.8297 26.62 12.4155 26.0342L16.4792 21.9705L12.4155 17.9068C11.8297 17.321 11.8297 16.3713 12.4155 15.7855C13.0013 15.1997 13.951 15.1997 14.5368 15.7855L18.6005 19.8492L22.6642 15.7855C23.25 15.1997 24.1997 15.1997 24.7855 15.7855Z"
      />
    ),
  },
};

const AlertModal = ({ isOpen, onClose, type }: AlertModalProps) => {
  const alert = alertTypes[type] || alertTypes.success;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[600px] p-5 lg:p-10"
    >
      <div className="text-center">
        <div className="relative flex items-center justify-center z-1 mb-7">
          <svg
            className={alert.bgColor}
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
          >
            {alert.icon}
          </svg>
        </div>
        <h4 className="mb-2 text-2xl font-semibold text-gray-800">
          {alert.title}
        </h4>
        <p className="text-sm leading-6 text-gray-500">{alert.description}</p>
        <div className="flex items-center justify-center w-full gap-3 mt-7">
          <button
            type="button"
            className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-success-500 shadow-theme-xs hover:bg-success-600 sm:w-auto"
            onClick={onClose}
          >
            Ok, compris
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;
