import React from 'react';

function Base({ className = '', style = {} }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

function Text({ lines = 3, className = '' }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Base
          key={i}
          className="h-4"
          style={{ width: i === lines - 1 ? '65%' : '100%' }}
        />
      ))}
    </div>
  );
}

function Card({ className = '' }) {
  return (
    <div className={`card p-6 flex flex-col gap-4 ${className}`}>
      <Base className="h-40 w-full rounded-xl" />
      <Base className="h-5 w-2/3" />
      <Base className="h-4 w-full" />
      <Base className="h-4 w-4/5" />
      <div className="flex gap-2 mt-2">
        <Base className="h-6 w-16 rounded-full" />
        <Base className="h-6 w-16 rounded-full" />
        <Base className="h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

function Grid({ cols = 3, count = 6, className = '' }) {
  const gridCols = { 1: 'grid-cols-1', 2: 'grid-cols-1 md:grid-cols-2', 3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' };
  return (
    <div className={`grid ${gridCols[cols] || gridCols[3]} gap-5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => <Card key={i} />)}
    </div>
  );
}

function Stat({ className = '' }) {
  return (
    <div className={`card p-5 flex flex-col gap-2 items-center ${className}`}>
      <Base className="h-10 w-16 rounded-lg" />
      <Base className="h-3 w-20" />
    </div>
  );
}

function StatRow({ count = 3 }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => <Stat key={i} />)}
    </div>
  );
}

const Skeleton = { Base, Text, Card, Grid, Stat, StatRow };
export default Skeleton;
