import notePin from "../../../public/note-pin.png"
import Image from 'next/image'

interface NoteProps {
    title: string;
    content: string;
    onDelete?: () => void;
    onEdit: () => void;
}

export default function Note(props: NoteProps) {
    return (
        <div className="relative bg-postit-yellow p-4 w-60 h-48 rounded-lg cursor-pointer shadow-lg" onClick={props.onEdit}>
            <h2 className="text-2xl font-bold mb-4 text-blue-pen">{props.title}</h2>
            <p className="text-blue-pen">{props.content}</p>
            <Image src={notePin} alt="Pin" className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-8 h-8" />
        </div>
    );
}