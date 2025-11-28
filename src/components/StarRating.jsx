import React from "react";

export default function StarRating({ rating, setRating }) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((num) => (
        <span
          key={num}
          onClick={() => setRating(num)}
          className={`cursor-pointer text-3xl ${
            num <= rating ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
