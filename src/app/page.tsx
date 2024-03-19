/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';
import { useEffect, useState } from "react";
import AbsoluteCreationButton from "~/components/AbsoluteCreationButton";
import backgroundImage from "../../public/note-board.jpg"
import Note from "~/components/Note";
import NoteCreationAndEditionModal from "~/components/NoteCreationAndEditionModal";
import { type NotesDTO } from "./api/notes/dtos";


interface Note {
  id: string;
  title: string;
  content: string;
  created_at: Date,
  updated_at: Date
}

export default function NoteDashboard() {

  const [notes, setNotes] = useState<NotesDTO[]>([])
  const [noteCreationModalOpen, setNoteCreationModalOpen] = useState<boolean>(false)
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null)

  function toggleNoteCreationModal() {
    setNoteCreationModalOpen(!noteCreationModalOpen)
  }

  useEffect(() => {
    void (async () => await getNotes())()

  }, [])

  async function getNotes() {
    try {
      const response = await fetch('/api/notes');
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data.notes as NotesDTO[]);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundAttachment: 'fixed'
      }}>
      {noteCreationModalOpen &&
        <NoteCreationAndEditionModal
          noteToEdit={noteToEdit}
          isOpen={noteCreationModalOpen}
          onClose={() => {
            toggleNoteCreationModal()
            noteToEdit && setNoteToEdit(null)
          }}
        />
      }
      <header className="text-4xl font-bold mb-8 text-black p-12">YourNotes Dashboard</header>

      <div className="grid grid-cols-5 gap-8">
        {notes.map((note) => {
          return (
            <Note
              key={note.id}
              title={note.title}
              content={note.content}
              onEdit={() => {
                setNoteToEdit(note)
                toggleNoteCreationModal()
              }}
            />
          )
        })}
      </div>

      <AbsoluteCreationButton onClick={toggleNoteCreationModal} />
    </main>
  );
}