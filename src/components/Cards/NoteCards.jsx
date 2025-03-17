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
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-300 relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h6 className="text-lg font-semibold text-gray-900">{title}</h6>
          <span className="text-xs text-gray-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`w-6 h-6 cursor-pointer transition-all duration-300 ${
            isPinned
              ? "text-yellow-500 scale-110"
              : "text-gray-400 hover:text-gray-600"
          }`}
          onClick={onPinNote}
        />
      </div>

      {/* Content */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
        {content?.slice(0, 100)}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs">
        {/* Tags */}
        <div className="text-indigo-500 font-medium space-x-1">
          {tags.map((item, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-indigo-100 text-indigo-600 rounded-md"
            >
              #{item}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <MdCreate
            className="w-5 h-5 text-gray-500 hover:text-green-600 cursor-pointer transition-transform hover:scale-110"
            onClick={onEdit}
          />
          <MdDelete
            className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer transition-transform hover:scale-110"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCards;
