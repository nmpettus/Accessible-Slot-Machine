import React from 'react';

export function Footer() {
  return (
    <div className="text-center text-sm text-cyan-300/80 mt-6">
      <p className="mb-2">Press SPACE to spin</p>
      <div className="flex justify-center gap-4">
        <span>2️⃣ Match: 20 🎯</span>
        <span>3️⃣ Match: 50 🎯</span>
        <span>4️⃣ Match: 100 🎯</span>
      </div>
    </div>
  );
}