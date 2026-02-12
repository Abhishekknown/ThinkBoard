import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import api from "./lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All field are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content }); // Link and what need to passed is here
      toast.success("Post Created Succesfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating the note", error);
      if (error.response.status === 429) {
        toast.error("too many saving bro,wait ☠️", {
          duration: 4000,
          icon: "☠️",
        });
      } else {
        toast.error("failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>

              {/* The form */}
              <form onSubmit={(e) => handleSubmit(e)}>
                {/* First Block */}
                <div className="form-control mb-4 ">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Second Block */}
                <div className="form-control mb-4 ">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <textarea
                    type="Write your notes here"
                    placeholder="Note Title"
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                {/* this btn */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating.." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
