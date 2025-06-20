'use client';

import { insertReview } from '@/app/products/return-products';
import { useActionState, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useTransition } from 'react';
import { ProfileProps } from '@/app/types';
type Role = 'client' | 'provider';
type State={
  error:string,
  success:boolean
}
interface PostReviewProps {
  role: Role;
  id:number|string
 // onSubmit: (review: { rating: number; message: string }) => void;
}

export default function PostReview({ role, identity, isOpen, onClose, full_name }: { role: Role , identity:string|number , isOpen: boolean; onClose: () => void, full_name:string }) {
  const [rating, setRating] = useState(0); 
   const [message, setMessage] = useState(''); 
  const [isPending, startTransition] = useTransition();
 const submitReview =()=>{
 insertReview(rating, message, identity, full_name)
  onClose();
      setRating(0);
    setMessage('');
  }
   
  if (!isOpen) return null;
 
  return (<> 
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> 
      
       <form
        action={submitReview}
        className="bg-white p-6 rounded-xl w-full max-w-md space-y-4 relative shadow-lg"
      >  <h2 className="text-xl font-semibold text-gray-800">
        {role === 'client' ? 'Review Service Provider' : 'Review Client'} — {full_name}
      </h2>
        <button
          onClick={onClose}
          type="button"
          className="absolute top-2 right-2 text-gray-500 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-bold">Write a Review</h2>

        {/* Rating */}
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl ${
                star <= rating ? 'text-yellow-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500' : 'text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 '
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />

        {/* Review */}
        <textarea
          name="review" 
          placeholder="Your thoughts..."
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          rows={4}
        /> 
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          disabled={isPending}
        >
          {isPending ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div> 

 </>

  );
}
