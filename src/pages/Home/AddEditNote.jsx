import React, { useState } from "react";
import TagInput from "../../components/input/TagInput";
import {
  MdClose,
  MdTitle,
  MdDescription,
  MdLocalOffer,
  MdSave,
} from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const AddEditNote = ({ noteData, type, getAllNotes, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addNewNote = async () => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        toast.success("Catatan berhasil ditambahkan!", {
          position: "top-right",
          autoClose: 3000,
        });

        getAllNotes();
        onClose();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Terjadi kesalahan saat menambahkan catatan.",
        { position: "top-right", autoClose: 3000 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const editNote = async () => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.put("/edit-note/" + noteData._id, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        toast.success("Catatan berhasil diperbarui!", {
          position: "top-right",
          autoClose: 3000,
        });

        getAllNotes();
        onClose();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Terjadi kesalahan saat memperbarui catatan.",
        { position: "top-right", autoClose: 3000 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNote = () => {
    if (!title) return setError("Masukkan judul catatan");
    if (!content) return setError("Masukkan isi catatan");
    setError("");

    type === "edit" ? editNote() : addNewNote();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-full max-w-lg mx-4 md:mx-0 bg-white rounded-xl shadow-2xl p-6 sm:p-8 transform transition-all scale-95 hover:scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <MdClose className="text-2xl text-gray-500" />
        </button>

        {/* Header */}
        <div className="mb-6 pb-2 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {type === "edit" ? "Edit Catatan" : "Tambah Catatan"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {type === "edit"
              ? "Perbarui catatan Anda"
              : "Buat catatan baru untuk ide-ide Anda"}
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Title Field */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MdTitle className="text-blue-500" />
              Judul Catatan
            </label>
            <input
              type="text"
              placeholder="Masukkan judul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 px-4 py-3 text-gray-800 border rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
            />
          </div>

          {/* Content Field */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MdDescription className="text-blue-500" />
              Isi Catatan
            </label>
            <textarea
              placeholder="Tulis isi catatan Anda..."
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mt-1 px-4 py-3 text-gray-800 border rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 resize-none"
            />
          </div>

          {/* Tags Field */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MdLocalOffer className="text-blue-500" />
              Tag
            </label>
            <TagInput tags={tags} setTags={setTags} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            className={`mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
            onClick={handleAddNote}
            disabled={isSubmitting}
          >
            <MdSave />
            {isSubmitting
              ? "Menyimpan..."
              : type === "edit"
              ? "Perbarui Catatan"
              : "Tambah Catatan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditNote;
