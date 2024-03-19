import { IoAdd } from "react-icons/io5";

interface AbsoluteCreationButtonProps {
    onClick: () => void;
}

export default function AbsoluteCreationButton(props: AbsoluteCreationButtonProps) {
    return (
        <button
            className="fixed bottom-4 right-4 w-20 h-20 bg-green text-white rounded-full flex items-center justify-center"
            onClick={props.onClick}
        >
            <IoAdd size={60} />
        </button>
    )
}