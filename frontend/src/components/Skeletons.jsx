import React from 'react';

export const ProjectCardSkeleton = () => {
  return (
    <div className="glass-card rounded-xl overflow-hidden flex flex-col h-full animate-pulse">
      {/* Thumbnail */}
      <div className="h-48 skeleton w-full"></div>
      
      {/* Body */}
      <div className="p-6 flex-grow space-y-4">
        <div className="h-4 skeleton w-1/4 rounded"></div>
        <div className="h-6 skeleton w-3/4 rounded"></div>
        <div className="h-16 skeleton w-full rounded"></div>
        
        {/* Tech Stack tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-6 skeleton w-12 rounded-full"></div>
          <div className="h-6 skeleton w-16 rounded-full"></div>
          <div className="h-6 skeleton w-14 rounded-full"></div>
        </div>
      </div>
      
      {/* Footer buttons */}
      <div className="p-6 pt-0 border-t border-slate-100 dark:border-darkBorder/40 flex justify-between gap-4 mt-auto">
        <div className="h-9 skeleton w-1/2 rounded"></div>
        <div className="h-9 skeleton w-1/2 rounded"></div>
      </div>
    </div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 skeleton w-64 rounded"></div>
          <div className="h-4 skeleton w-48 rounded"></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-6 rounded-xl space-y-3">
            <div className="h-4 skeleton w-20 rounded"></div>
            <div className="h-8 skeleton w-12 rounded"></div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="h-10 skeleton w-full sm:w-64 rounded-lg"></div>
        <div className="h-10 skeleton w-full sm:w-48 rounded-lg"></div>
      </div>

      {/* Request Rows */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-darkBorder/50 skeleton h-12 w-full"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-6 border-b border-slate-100 dark:border-darkBorder/30 flex justify-between items-center">
            <div className="space-y-2 w-1/3">
              <div className="h-5 skeleton w-40 rounded"></div>
              <div className="h-4 skeleton w-24 rounded"></div>
            </div>
            <div className="space-y-2 w-1/3">
              <div className="h-5 skeleton w-32 rounded"></div>
              <div className="h-4 skeleton w-20 rounded"></div>
            </div>
            <div className="h-7 skeleton w-20 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RequestDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-pulse">
      {/* Header */}
      <div className="h-6 skeleton w-32 rounded"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-xl space-y-4">
            <div className="h-8 skeleton w-3/4 rounded"></div>
            <div className="h-4 skeleton w-1/4 rounded"></div>
            <div className="space-y-2 pt-4">
              <div className="h-4 skeleton w-full rounded"></div>
              <div className="h-4 skeleton w-full rounded"></div>
              <div className="h-4 skeleton w-5/6 rounded"></div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-card p-6 rounded-xl space-y-6">
            <div className="h-6 skeleton w-40 rounded"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-4 skeleton w-4 rounded-full mt-1"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 skeleton w-24 rounded"></div>
                  <div className="h-4 skeleton w-48 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl space-y-4">
            <div className="h-6 skeleton w-32 rounded"></div>
            <div className="h-10 skeleton w-full rounded"></div>
            <div className="h-10 skeleton w-full rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
