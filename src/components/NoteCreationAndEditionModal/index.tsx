import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Note {
    id: string;
    title: string;
    content: string;
}

interface NoteCreationModalProps {
    isOpen: boolean;
    noteToEdit?: Note | null;
    onClose: () => void;
}


export default function NoteCreationAndEditionModal(props: NoteCreationModalProps) {
    const [noteTitle, setNoteTitle] = useState<string>("")
    const [noteContent, setNoteContent] = useState<string>("")

    const [titleError, setTitleError] = useState<string>("");
    const [contentError, setContentError] = useState<string>("");

    const router = useRouter()

    function clearInputs() {
        setNoteTitle("")
        setNoteContent("")
        setTitleError("")
        setContentError("")
    }

    useEffect(() => {
        if (props.noteToEdit) {
            setNoteTitle(props.noteToEdit.title)
            setNoteContent(props.noteToEdit.content)
        }
    }, [props.noteToEdit])

    async function deleteNote(id: string) {
        try {
            const response = await fetch('/api/notes', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
            if (!response.ok) {
                throw new Error('Failed to delete note');
            }

            router.refresh()
            props.onClose()

        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }

    function validateForm(): boolean {
        let isValid = true;

        if (noteTitle.trim() === "") {
            setTitleError("Please enter a title.");
            isValid = false;
        } else {
            setTitleError("");
        }
        if (noteContent.trim() === "") {
            setContentError("Please enter the content.");
            isValid = false;
        } else {
            setContentError("");
        }
        return isValid;
    }

    async function createNote() {
        if (validateForm()) {
            try {
                const response = await fetch('/api/notes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: noteTitle, content: noteContent })
                });
                if (!response.ok) {
                    throw new Error('Failed to create note');
                }

                router.refresh()
                props.onClose()

            } catch (error) {
                console.error('Error creating note:', error);
            }
        }
    }

    async function updateNote() {
        if (validateForm()) {
            try {
                const response = await fetch('/api/notes', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: props.noteToEdit?.id, title: noteTitle, content: noteContent })
                });
                if (!response.ok) {
                    throw new Error('Failed to update note');
                }

                router.refresh()
                props.onClose()

            } catch (error) {
                console.error('Error updating note:', error);
            }
        }
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
            <div className="bg-postit-yellow p-8 rounded-xl w-96">
                <form onSubmit={() => props.noteToEdit ? updateNote() : createNote()}>
                    <h2 className="text-2xl font-bold mb-4 text-white">{props.noteToEdit ? `Edit note` : `Create a new note`}</h2>
                    <input
                        type="text"
                        maxLength={30}
                        placeholder="Here goes your title..."
                        className="w-full border-2 border-gray-200 p-2 rounded-lg mb-4 text-black"
                        onChange={(event) => {
                            setNoteTitle(event.target.value);
                        }}
                        value={noteTitle}
                        name="title"
                    />
                    <textarea
                        maxLength={100}
                        placeholder="Write your note here..."
                        className="w-full border-2 h-36 border-gray-200 p-2 rounded-lg mb-4 text-black resize-none"
                        value={noteContent}
                        onChange={(event) => {
                            setNoteContent(event.target.value);
                        }}
                        name="content"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                clearInputs();
                                props.onClose();
                            }}
                            className="text-white px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                        {props.noteToEdit && (
                            <button
                                type="button"
                                className="text-white px-4 py-2 rounded-lg"
                                onClick={() => props.noteToEdit && deleteNote(props.noteToEdit.id)}
                            >
                                Delete note
                            </button>
                        )}
                        <button
                            type="submit"
                            className="text-white px-4 py-2 rounded-lg"
                        >
                            {props.noteToEdit ? `Edit note` : `Create note`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}      