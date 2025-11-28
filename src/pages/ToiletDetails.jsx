import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import StarRating from "../components/StarRating";

export default function ToiletDetails() {
  const { id } = useParams();

  const [toilet, setToilet] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Review form state
  const [overall, setOverall] = useState(0);
  const [clean, setClean] = useState(0);
  const [amen, setAmen] = useState(0);
  const [space, setSpace] = useState(0);
  const [layout, setLayout] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    loadToilet();
    loadReviews();
  }, []);

  async function loadToilet() {
    try {
      const res = await api.get(`/toilets/${id}`);
      setToilet(res.data.data.toilet);
      setReviews(res.data.data.reviews);
    } catch (err) {
      console.error(err);
      alert("Failed to load toilet details");
    }
  }

  async function loadReviews() {
    try {
      const res = await api.get(`/reviews/toilet/${id}`);
      setReviews(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function submitReview(e) {
    e.preventDefault();

    if (!overall || !clean || !amen || !space || !layout) {
      alert("Please give all ratings (overall + categories)");
      return;
    }

    try {
      await api.post("/reviews", {
        toiletId: id,
        overallRating: overall,
        cleanlinessRating: clean,
        amenitiesRating: amen,
        spaciousnessRating: space,
        layoutRating: layout,
        comment,
      });

      // Reset form
      setOverall(0);
      setClean(0);
      setAmen(0);
      setSpace(0);
      setLayout(0);
      setComment("");

      loadReviews();
      loadToilet();
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  }

  // -----------------------------------------
  // LIKE / DISLIKE HANDLERS
  // -----------------------------------------
  async function handleLike(reviewId) {
    try {
      await api.post(`/reviews/${reviewId}/like`);
      loadReviews();
    } catch (err) {
      console.error(err);
      alert("Failed to like review");
    }
  }

  async function handleDislike(reviewId) {
    try {
      await api.post(`/reviews/${reviewId}/dislike`);
      loadReviews();
    } catch (err) {
      console.error(err);
      alert("Failed to dislike review");
    }
  }

  if (!toilet) return <p>Loading toilet details...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 pb-10">

      {/* Toilet Info */}
      <h1 className="text-3xl font-bold mb-4">{toilet.name}</h1>
      <p className="text-gray-700 mb-4">{toilet.description}</p>
      <p className="text-sm text-gray-500 mb-6">
        Location: {toilet.location?.lat}, {toilet.location?.lng}
      </p>

      {/* -------------------------------------------------- */}
      {/* REVIEW FORM */}
      {/* -------------------------------------------------- */}

      <div className="border p-4 rounded-lg mb-8 bg-white shadow">
        <h2 className="text-xl font-semibold mb-3">Leave a Review</h2>

        <form onSubmit={submitReview}>

          <label className="block font-medium mt-3">Overall rating</label>
          <StarRating rating={overall} setRating={setOverall} />

          <label className="block font-medium mt-3">Cleanliness</label>
          <StarRating rating={clean} setRating={setClean} />

          <label className="block font-medium mt-3">Amenities</label>
          <StarRating rating={amen} setRating={setAmen} />

          <label className="block font-medium mt-3">Spaciousness</label>
          <StarRating rating={space} setRating={setSpace} />

          <label className="block font-medium mt-3">Layout</label>
          <StarRating rating={layout} setRating={setLayout} />

          <textarea
            className="w-full border p-2 mt-4 rounded"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 mt-4 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* -------------------------------------------------- */}
      {/* REVIEWS LIST */}
      {/* -------------------------------------------------- */}

      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-gray-600">No reviews yet. Be the first!</p>
      )}

      {reviews.map((rev) => (
        <div
          key={rev.reviewId}
          className="border p-3 mb-3 rounded bg-gray-50 shadow-sm"
        >
          <p className="text-yellow-500 text-lg">
            {"★".repeat(Math.round(rev.overallRating))}
          </p>

          <p className="text-gray-700">{rev.comment}</p>

          <p className="text-sm text-gray-400 mt-1">
            {new Date(rev.createdAt).toLocaleString()}
          </p>

          {/* LIKE / DISLIKE BUTTONS */}
          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={() => handleLike(rev.reviewId)}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              👍 {rev.likes || 0}
            </button>

            <button
              onClick={() => handleDislike(rev.reviewId)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              👎 {rev.dislikes || 0}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
