import React from "react";
import Button from "../atoms/Buttons";
import defaultImage from "../../assets/images/default-gambar.svg";

const DestinationCard = ({
  imageUrl,
  title,
  category,
  address,
  rating,
  description,
  isLiked,
  onDetailClick,
  onLikeClick,
}) => {
  return (
    <div className="group w-full h-full flex flex-col border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-3.5 bg-white">
      {/* Image Wrapper dengan efek Gradient Overlay saat di-hover */}
      <div className="relative h-48 mb-5 rounded-xl overflow-hidden bg-slate-50 shrink-0 after:absolute after:inset-0 after:bg-linear-to-t after:from-black/30 after:via-transparent after:to-transparent after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-500">
        <button
          onClick={onLikeClick}
          className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/70 hover:bg-white backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110 active:scale-95 group/btn"
          aria-label="Like Place"
        >
          {isLiked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500 fill-current drop-shadow-sm group-hover/btn:scale-110 transition-transform duration-300"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-slate-500 group-hover/btn:text-red-500 group-hover/btn:scale-110 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </button>

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium bg-slate-100">
            No Image
          </div>
        )}
      </div>

      {/* Konten Teks */}
      <div className="flex flex-col grow px-1">
        <div className="flex justify-between items-start mb-1.5 gap-2">
          <h3
            className="text-lg md:text-xl font-bold text-slate-800 line-clamp-1 tracking-tight group-hover:text-[#0061FF] transition-colors duration-300"
            title={title}
          >
            {title}
          </h3>
        </div>

        {/* Kategori diubah visualnya menyerupai Badge/Pill */}
        <h4 className="font-bold text-[11px] text-[#0061FF] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md w-max mb-3 uppercase tracking-wider">
          {category}
        </h4>

        <p
          className="line-clamp-2 text-sm text-slate-500 mb-5 leading-relaxed"
          title={description}
        >
          {description}
        </p>

        {/* Tombol Detail dengan Gradient dan Efek Glow */}
        <Button
          onClick={onDetailClick}
          styles="w-full text-white bg-gradient-to-r from-[#003BFF] to-[#0061FF] hover:from-blue-700 hover:to-blue-800 !rounded-xl shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 !text-sm font-semibold !py-2.5 mt-auto"
        >
          Detail...
        </Button>
      </div>
    </div>
  );
};

export default DestinationCard;
