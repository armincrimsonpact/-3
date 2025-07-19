import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', animate = true }) => {
  const baseClasses = `bg-gray-700 rounded ${className}`;
  
  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    );
  }
  
  return <div className={baseClasses} />;
};

// Form Field Skeleton
export const FormFieldSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
    </div>
  );
};

// Card Skeleton
export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-lg p-6 space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="space-y-4">
        <FormFieldSkeleton count={3} />
      </div>
      <div className="flex justify-between pt-4">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};

// Step Indicator Skeleton
export const StepIndicatorSkeleton: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
};

// Progress Bar Skeleton
export const ProgressBarSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mb-8">
      <Skeleton className="h-2 w-full rounded-full mb-4" />
      <div className="text-center">
        <Skeleton className="h-4 w-20 mx-auto" />
      </div>
    </div>
  );
};

// Booking Page Skeleton
export const BookingPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900">
      {/* Navigation Bar Skeleton */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <div className="flex space-x-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col items-center pt-24 pb-12 px-4">
        {/* Title Skeleton */}
        <div className="text-center mb-6">
          <Skeleton className="h-10 w-64 mx-auto mb-3" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>

        {/* Progress Bar Skeleton */}
        <ProgressBarSkeleton />

        {/* Step Indicator Skeleton */}
        <div className="w-full max-w-4xl px-4 mb-8">
          <StepIndicatorSkeleton />
        </div>

        {/* Form Container Skeleton */}
        <div className="w-full max-w-4xl px-4">
          <CardSkeleton />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-black/50 p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-5 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// List Item Skeleton
export const ListItemSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
};

// Table Skeleton
export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ 
  rows = 5, 
  cols = 4 
}) => {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800/50 p-4 border-b border-gray-700">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-20" />
          ))}
        </div>
      </div>
      
      {/* Rows */}
      <div className="divide-y divide-gray-700">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-4 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton; 