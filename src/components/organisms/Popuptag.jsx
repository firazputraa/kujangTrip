import React, { useState } from "react";
import ikonTangan from "../../assets/images/hand1.svg";

const TagSelectionPopup = ({ isOpen, onClose, onSubmit }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const availableTags = [
    { id: "alam", label: "Alam" },
    { id: "kuliner", label: "Kuliner" },
    { id: "buatan", label: "Buatan" },
    { id: "edukasi", label: "Edukasi" },
    { id: "budaya", label: "Budaya" },
  ];

  const toggleTag = (tagLabel) => {
    if (selectedTags.includes(tagLabel)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagLabel));
    } else {
      setSelectedTags([...selectedTags, tagLabel]);
    }
  };

  const handleStartExploring = () => {
    onSubmit(selectedTags);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fade-in">
      <div className="bg-white rounded-3xl px-6 py-8 md:px-8 md:py-8 max-w-xl w-full text-center shadow-2xl border border-gray-100">
        <div className="mb-2">
          <img
            src={ikonTangan}
            alt="Hand Icon"
            className="block mx-auto h-36 w-36 md:h-40 md:w-40"
          />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Selamat Datang di <br /> Kujang
          <span className="text-[#0038FF] italic font-black">Trip</span>
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
          Pilih kategori wisata yang kamu suka untuk membantu kami menemukan
          tempat terbaik di Kota Bogor untukmu
        </p>

        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-8 max-w-lg mx-auto">
          {availableTags.map((tag) => {
            const isSelected = selectedTags.includes(tag.label);
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.label)}
                className={`px-5 py-2 rounded-full font-bold text-sm sm:text-base border transition-all duration-200 cursor-pointer select-none flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#0038FF] text-white border-[#0038FF] shadow-md shadow-blue-500/25 scale-105"
                    : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                }`}
              >
                <span>{isSelected ? "✓" : "+"}</span>
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            onClick={handleStartExploring}
            type="button"
            className="w-full max-w-sm bg-[#0038FF] hover:bg-blue-700 text-white font-bold text-lg px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 cursor-pointer active:scale-95"
          >
            Jelajahi
          </button>

          <button
            onClick={onClose}
            type="button"
            className="font-extrabold text-gray-900 hover:text-black underline underline-offset-4 text-base transition-colors duration-300 cursor-pointer"
          >
            Lewati Sekarang...
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagSelectionPopup;
