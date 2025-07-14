"use client";

import React, { useEffect, useState } from "react";
import NoteList from "@/components/NoteList";
import NoteModal from "@/components/NoteModal";
import ConfirmDialog from "@/components/ConfirmDialog";

// You might want to adjust this backend URL if deploying separately
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deleteNoteId, setDeleteNoteId] = useState<number | null>(null);

  // Fetch notes from backend
  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/notes`);
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message ?? "Error fetching notes");
      } else {
        setError("Error fetching notes");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Modal handlers
  const handleOpenCreate = () => {
    setEditingNote(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (note: Note) => {
    setEditingNote(note);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingNote(null);
  };

  // CRUD actions
  const handleCreateNote = async (title: string, content: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to create note");
      }
      handleCloseModal();
      fetchNotes();
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message ?? "Error creating note");
      } else {
        alert("Error creating note");
      }
    }
  };

  const handleEditNote = async (id: number, title: string, content: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to update note");
      }
      handleCloseModal();
      fetchNotes();
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message ?? "Error updating note");
      } else {
        alert("Error updating note");
      }
    }
  };

  const handleRequestDelete = (id: number) => {
    setDeleteNoteId(id);
  };

  const handleCancelDelete = () => {
    setDeleteNoteId(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteNoteId == null) return;
    try {
      const res = await fetch(`${BACKEND_URL}/notes/${deleteNoteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete note");
      setDeleteNoteId(null);
      fetchNotes();
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message ?? "Error deleting note");
      } else {
        alert("Error deleting note");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] flex flex-col">
      <header className="flex items-center justify-between px-4 py-6 shadow-sm bg-white/80 dark:bg-[#101014]/90 sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-tight text-[color:var(--primary,#1976d2)]">
          📝 Personal Notes
        </h1>
        <button
          onClick={handleOpenCreate}
          className="bg-[color:var(--primary,#1976d2)] hover:bg-[color:var(--accent,#ffca28)] transition text-white hover:text-black font-medium py-2 px-4 rounded-full shadow"
          style={{
            background: "var(--primary,#1976d2)",
            color: "var(--background,#ffffff)",
          }}
        >
          + New Note
        </button>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6 sm:p-8">
        {loading && <div className="text-center py-10 text-lg">Loading notes…</div>}
        {error && <div className="text-center text-red-500 my-4">{error}</div>}
        {!loading && (
          <NoteList
            notes={notes}
            onEdit={handleOpenEdit}
            onDelete={handleRequestDelete}
          />
        )}
      </main>

      <NoteModal
        open={modalOpen}
        note={editingNote}
        onClose={handleCloseModal}
        onCreate={handleCreateNote}
        onEdit={handleEditNote}
      />

      <ConfirmDialog
        open={deleteNoteId != null}
        message="Are you sure you want to delete this note?"
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <footer className="text-xs text-gray-400 text-center py-3">
        &copy; {new Date().getFullYear()} Personal Notes App &mdash; Next.js + FastAPI Demo
      </footer>
    </div>
  );
}
