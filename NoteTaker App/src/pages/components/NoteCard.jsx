import { PenSquareIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";

import React from "react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // Get rid of navaigation cuz of LInk

    if (!window.confirm("Are you sure you wanna delete the note")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note Create Successfully");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to delete note");
    } finally {
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-action flex justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {note.createdAt ? formatDate(new Date(note.createdAt)) : "—"}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <TrashIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
