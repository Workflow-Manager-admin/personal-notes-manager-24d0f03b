import React from "react";
import type { Note } from "@/app/page";

// PUBLIC_INTERFACE
type NoteListProps = {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
};

/**
 * Renders the list of notes in a responsive layout.
 */
const NoteList: React.FC<NoteListProps> = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-500 pt-16">
        <p>No notes yet. Click <b>+ New Note</b> to create your first note!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white dark:bg-[#232328] rounded-lg shadow flex flex-col justify-between p-5 group transition hover:shadow-lg border border-[color:var(--secondary,#424242)]/10"
        >
          <div>
            <h2 className="font-semibold text-lg mb-2 text-[color:var(--primary,#1976d2)] truncate">{note.title}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 break-words mb-3 whitespace-pre-line">{note.content}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-400 italic">
              {new Date(note.updated_at ?? note.created_at).toLocaleString()}
            </span>
            <span className="flex gap-1">
              <button
                onClick={() => onEdit(note)}
                className="rounded px-2 py-1 text-xs font-medium text-[color:var(--primary,#1976d2)] hover:bg-[color:var(--primary,#1976d2)]/10 transition"
                aria-label="Edit note"
                title="Edit Note"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(note.id)}
                className="rounded px-2 py-1 text-xs font-medium text-[color:var(--accent,#ffca28)] hover:bg-[color:var(--accent,#ffca28)]/20 transition"
                aria-label="Delete note"
                title="Delete Note"
              >
                Delete
              </button>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
