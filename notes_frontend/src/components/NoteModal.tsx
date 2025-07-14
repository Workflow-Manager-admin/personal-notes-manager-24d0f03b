import React, { useEffect, useState } from "react";
import type { Note } from "@/app/page";

type NoteModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, content: string) => void;
  onEdit: (id: number, title: string, content: string) => void;
  note: Note | null;
};

/**
 * Modal dialog for creating or editing a note.
 */
// PUBLIC_INTERFACE
const NoteModal: React.FC<NoteModalProps> = ({
  open,
  onClose,
  onCreate,
  onEdit,
  note,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
    setErr(null);
  }, [note, open]);

  const validate = () => {
    if (!title || title.length < 1)
      return "Title required";
    if (title.length > 128)
      return "Title too long";
    if (!content || content.length < 1)
      return "Content required";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setErr(v);
      return;
    }
    if (note) {
      onEdit(note.id, title, content);
    } else {
      onCreate(title, content);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center">
      <div className="bg-white dark:bg-[#19191d] rounded-xl shadow-2xl max-w-md w-full mx-2 p-7 relative">
        <span
          onClick={onClose}
          title="Close"
          className="absolute right-5 top-5 text-xl text-gray-400 cursor-pointer hover:text-black dark:hover:text-white"
        >
          ×
        </span>
        <h3 className="text-2xl font-bold mb-6 text-[color:var(--primary,#1976d2)]">
          {note ? "Edit Note" : "Create Note"}
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="title" className="block mb-1 text-sm font-semibold">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              maxLength={128}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 focus:border-[color:var(--primary,#1976d2)] outline-none text-black"
              placeholder="Enter note title"
              required
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="content" className="block mb-1 text-sm font-semibold">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={5}
              className="w-full p-2 rounded border border-gray-300 focus:border-[color:var(--primary,#1976d2)] outline-none text-black"
              placeholder="Write your note here…"
              required
            />
          </div>
          {err && <div className="text-red-600 text-sm py-1">{err}</div>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition text-black font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[color:var(--primary,#1976d2)] hover:bg-[color:var(--accent,#ffca28)] hover:text-black transition text-white font-medium"
              style={{
                background: "var(--primary,#1976d2)",
                color: "var(--background,#ffffff)",
              }}
            >
              {note ? "Save Changes" : "Add Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
