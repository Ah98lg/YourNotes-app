import { useEffect, useState } from "react";
import { type NoteDTO } from "~/app/api/notes/interfaces/dto";

interface NoteCreationModalProps {
    isOpen: boolean;
    noteToEdit?: NoteDTO | null;
    onClose: () => void;
    refresh: () => void;
}


export default function NoteCreationAndEditionModal(props: NoteCreationModalProps) {
    const [noteTitle, setNoteTitle] = useState<string>("")
    const [noteContent, setNoteContent] = useState<string>("")

    const [titleError, setTitleError] = useState<string>("");
    const [contentError, setContentError] = useState<string>("");

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

    useEffect(() => {
        if (noteContent) {
            setTitleError("")
        }
        if (noteTitle) {
            setContentError("")
        }
    }, [noteContent, noteTitle])

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

            props.refresh()
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

    async function createNote(event: React.FormEvent<HTMLFormElement>) {
        event?.preventDefault()
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

                props.refresh()
                props.onClose()

            } catch (error) {
                console.error('Error creating note:', error);
            }
        }
    }

    async function updateNote(event: React.FormEvent<HTMLFormElement>) {
        event?.preventDefault()
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

                props.refresh()
                props.onClose()

            } catch (error) {
                console.error('Error updating note:', error);
            }
        }
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
            <div className="bg-postit-yellow p-8 rounded-xl w-96">
                <form onSubmit={(event) => props.noteToEdit ? updateNote(event) : createNote(event)}>
                    <h2 className="text-2xl font-bold mb-4 text-white">{props.noteToEdit ? `Edit note` : `Create a new note`}</h2>
                    <input
                        type="text"
                        maxLength={30}
                        placeholder={`${titleError ? titleError : "Here goes your title..."}`}
                        className={`w-full border-2 border-gray-200 p-2 rounded-lg mb-4 ${titleError ? 'placeholder-red text-red' : 'placeholder-gray text-black'}`}
                        onChange={(event) => {
                            setNoteTitle(event.target.value);
                        }}
                        value={noteTitle}
                        name="title"
                    />
                    <textarea
                        maxLength={100}
                        placeholder={`${contentError ? contentError : "Write your note here..."}`}
                        className={`w-full border-2 h-36 border-red-200 p-2 rounded-lg mb-4 ${contentError ? 'placeholder-red text-red' : 'placeholder-gray text-black'} resize-none`}
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
                            className="text-white px-4 py-2 rounded-lg bg-gray"
                        >
                            Cancel
                        </button>
                        {props.noteToEdit && (
                            <button
                                type="button"
                                className="text-white px-4 py-2 rounded-lg bg-red"
                                onClick={() => props.noteToEdit && deleteNote(props.noteToEdit.id)}
                            >
                                Delete note
                            </button>
                        )}
                        <button
                            type="submit"
                            className="text-white px-4 py-2 rounded-lg bg-green"
                        >
                            {props.noteToEdit ? `Edit note` : `Create note`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}      