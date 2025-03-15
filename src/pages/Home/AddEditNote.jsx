import React, { useState } from "react";
import TagInput from "../../components/input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const AddEditNote = ({ noteData, type, getAllNotes, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        toast.success("Catatan berhasil ditambahkan!", {
          position: "top-right",
          autoClose: 3000, // Notifikasi akan hilang dalam 3 detik
        });

        getAllNotes();
        onClose();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan saat menambahkan catatan.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  const editNote = async () => {
    //EDIT API CALL
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        toast.success("Catatan berhasil diperbarui!", {
          position: "top-right",
          autoClose: 3000, // Notifikasi hilang dalam 3 detik
        });

        getAllNotes();
        onClose();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan saat memperbarui catatan.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  const handleAddNote = () => {
    if (!title) {
      setError("Please enter a title");
      return;
    }
    if (!content) {
      setError("Please enter a content");
      return;
    }
    setError("");

    if (type === "edit") {
      //EDIT API CALL
      editNote();
    } else {
      //ADD API CALL
      addNewNote();
    }
  };
  return (
    <div className="max-w-md mx-auto relative   rounded-lg">
      <button
        onClick={onClose}
        className="w-10 h-10  rounded-full flex items-center justify-center absolute -top-3 -right-3"
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">TITLE</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl text-slate-950 outline-none border border-slate-300 rounded-lg p-2 transition duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">CONTENT</label>
          <textarea
            placeholder="Content"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="text-xl text-slate-950 bg-slate-50 p-2 rounded-lg outline-none border border-slate-300 transition duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">TAGS</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200 w-full"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNote;
