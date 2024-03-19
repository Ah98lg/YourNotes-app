import { IoAdd } from "react-icons/io5";

interface AbsoluteCreationButtonProps {
    onClick: () => void;
}

export default function AbsoluteCreationButton(props: AbsoluteCreationButtonProps) {
    return (
        <button
            className="fixed bottom-2 right-2 md:bottom-8 md:right-8 w-12 h-12 md:w-20 md:h-20 bg-light-brown text-brown rounded-full flex items-center justify-center"
            onClick={props.onClick}
        >
            <IoAdd size={48} />
        </button>
    );

}