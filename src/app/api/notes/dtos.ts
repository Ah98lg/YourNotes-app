export interface NotesDTO {
    id: string;
    title: string;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
}