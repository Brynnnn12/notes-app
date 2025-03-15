import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCards from "../../components/Cards/NoteCards";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: noteDetails,
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
        setFilteredNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        toast.success("Catatan berhasil dihapus!", {
          position: "top-right",
          autoClose: 3000, // Notifikasi hilang dalam 3 detik
        });

        getAllNotes();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan saat menghapus catatan.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSearchNote = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredNotes(allNotes);
    } else {
      const filtered = allNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        value={searchQuery}
        onSearchNote={handleSearchNote}
      />
      <div className="container mx-auto">
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {filteredNotes.map((item) => (
              <NoteCards
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p>Tidak ada catatan yang tersedia.</p>
          </div>
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute bottom-10 right-10"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({
            isShown: false,
            type: "add",
            data: null,
          });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
        contentLabel="Add Note"
        className="w-[40%] max-h-3/4 bg-white rounded-md  mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
