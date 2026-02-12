import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import api from "./lib/axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setloading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); // Use to fetch id from the Frontend window context
  console.log({ id });
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        toast.success("Data Came");
      } catch (error) {
        console.error("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setloading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("are you really want to delete this note?")) return;

    try {
      await api.delete(`/note/${id}`);
      toast.success("note Deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting the note", error);
      toast.error("failed to delete the note");
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("please add a title or content");
      return;
    }
    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note Updated Successfully");
      navigate(`/`);
    } catch (error) {
      console.log("error saving the note", error);
      toast.error("failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex item-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  console.log("this is note", { note });

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>

                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note?.title || ""}
                  onChange={(e) =>
                    setNote({
                      ...note,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here ... "
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving" : "Save Change"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
