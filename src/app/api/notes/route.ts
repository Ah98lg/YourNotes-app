import { type NotesDTO } from "./dtos";
import { type NextApiRequest } from "next";
import { db } from "~/server/db";

export async function GET() {
    try {
        const notes: NotesDTO[] = await db.note.findMany();

        return Response.json({ notes }, { status: 200 });
    } catch (error: unknown) {
        return Response.json({ message: `Couldn't get notes` }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { title, content } = await req.json() as NotesDTO;

    console.log(req.body)

    try {
        if (!title || !content) {
            return Response.json({ message: `Please provide all the required fields` }, { status: 400 })
        }

        const newNote: NotesDTO = await db.note.create({
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

export async function PUT(req: Request) {
    const { id, title, content } = await req.json() as NotesDTO;

    try {
        if (!id || !title || !content) {
            return Response.json({ message: `Please provide all the required fields` }, { status: 400 })
        }

        const updatedNote: NotesDTO = await db.note.update({
            where: { id },
            data: { title, content }
        })

        return Response.json(updatedNote, { status: 200 })
    } catch (error: unknown) {
        return Response.json({ message: `Couldn't update note` }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
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