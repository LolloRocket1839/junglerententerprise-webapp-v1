
import React from 'react';
import { RoommateSwipe } from './RoommateSwipe';

export const RoommateMatching = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Find Your Perfect Roommate
        </h2>
        <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 shadow-xl">
          <RoommateSwipe />
        </div>
      </div>
    </div>
  );
};
