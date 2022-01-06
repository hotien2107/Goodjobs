import {AiOutlineClose} from "react-icons/ai"

const Modal = ({open, onClose, ...props}) => {

    if (!open) return <></>;
    return (
        <div className="fixed inset-0 z-10 overflow-auto bg-[#00000080] flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
                <div className="p-0 ml-auto mr-0">
                    <button className="text-xl p-1 rounded" onClick={() => onClose()}>
                        <AiOutlineClose />
                    </button>
                </div>
                {props.children}
            </div>
        </div>
    )
};

export default Modal;