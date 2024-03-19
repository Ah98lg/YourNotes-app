import { db } from "~/server/db";
import { type NoteDTO } from "./interfaces/dto";


/**
 * Retrieves all notes from the database.
 * @returns {Response} - Returns a response containing an array of notes.
 * @throws {Response} - Returns an error response if notes couldn't be retrieved.
 */
export async function GET(): Promise<Response> {
    try {
        const notes: NoteDTO[] = await db.note.findMany();

        return Response.json({ notes }, { status: 200 });
    } catch (error: unknown) {
        return Response.json({ message: `Couldn't get notes` }, { status: 500 });
    }
}


/**
 * Creates a new note in the database.
 * @param {NextApiRequest} req - The request object containing the note data.
 * @returns {Response} - Returns a response containing the newly created note.
 * @throws {Response} - Returns an error response if the note couldn't be created or required fields are missing.
 */
export async function POST(req: Request): Promise<Response> {
    const { title, content } = await req.json() as NoteDTO;

    try {
        if (!title || !content) {
            return Response.json({ message: `Please provide all the required fields` }, { status: 400 })
        }

        const newNote: NoteDTO = await db.note.create({
            data: {
                title,
                content
            }
        });

        return Response.json(newNote, { status: 201 });
    } catch (error: unknown) {
        return Response.json({ message: `Couldn't create note` }, { status: 500 });
    }
}


/**
 * Updates an existing note in the database.
 * @param {NextApiRequest} req - The request object containing the note data.
 * @returns {Response} - Returns a response containing the updated note.
 * @throws {Response} - Returns an error response if the note couldn't be updated or required fields are missing.
 */
export async function PUT(req: Request): Promise<Response> {
    const { id, title, content } = await req.json() as NoteDTO;

    try {
        if (!id || !title || !content) {
            return Response.json({ message: `Please provide all the required fields` }, { status: 400 })
        }

        const updatedNote: NoteDTO = await db.note.update({
            where: { id },
            data: { title, content }
        })

        return Response.json(updatedNote, { status: 200 })
    } catch (error: unknown) {
        return Response.json({ message: `Couldn't update note` }, { status: 500 })
    }
}

/**
 * Deletes a note from the database.
 * @param {NextApiRequest} req - The request object containing the note id.
 * @returns {Response} - Returns a response confirming the deletion of the note.
 * @throws {Response} - Returns an error response if the note couldn't be deleted or the id is missing.
 */
export async function DELETE(req: Request): Promise<Response> {
    const { id } = await req.json() as { id: string };

    console.log()

    try {
        if (!id) {
            return Response.json({ message: `Please provide the note id` }, { status: 400 })
        }

        await db.note.delete({
            where: { id }
        })

        return Response.json({ message: `Note deleted` }, { status: 200 })
    } catch (error: unknown) {
        return Response.json({ message: `Couldn't delete note` }, { status: 500 })
    }
}