import React from 'react';
import { Link } from 'react-router-dom';

export default function ToiletCard({ toilet }) {
  return (
    <div className="border p-3 mb-3 rounded">
      <h3 className="font-bold">{toilet.name}</h3>
      <p>{toilet.description}</p>
      <div className="mt-2">
        <Link to={`/toilet/${toilet.toiletId}`} className="text-blue-600">Details</Link>
      </div>
    </div>
  );
}
