import moment from "moment";
import React from "react";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

const NoteCards = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="bg-white  shadow-lg rounded-2xl p-4 border border-gray-200 relative transition-transform ">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h6 className="text-lg font-semibold text-gray-800">{title}</h6>
          <span className="text-xs text-gray-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`w-6 h-6 cursor-pointer transition-colors ${
            isPinned ? "text-yellow-500" : "text-gray-400 hover:text-gray-600"
          }`}
          onClick={onPinNote}
        />
      </div>

      {/* Content */}
      <p className="text-gray-700 text-sm mb-3 line-clamp-2">
        {content?.slice(0, 100)}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm">
        <div className="text-slate-500">{tags.map((item) => `#${item}`)}</div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="w-5 h-5 text-gray-500 hover:text-green-500 cursor-pointer"
            onClick={onEdit}
          />
          <MdDelete
            className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCards;
