import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import RateLimitedUI from "./components/RateLimitedUI";
import axios from "axios";
import api from "./lib/axios";
import toast from "react-hot-toast";
import NoteCard from "./components/NoteCard";
import NotesNotFound from "./components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setRateLimited(false);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        if (error.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <Navbar />
      {/* this basically say if it is ratelimited just go ahead and return this components */}
      {isRateLimited && <RateLimitedUI />}

      {/* Content loading part  */}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading Notes....
          </div>
        )}

        {/* condition Rendering */}
        {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>

      {/* Working on notes */}
    </div>
  );
};

export default HomePage;
