import React from 'react';

function Legend() {
  return (
    <div className="absolute bottom-8 right-8 bg-white rounded shadow p-3">
      <div className="font-bold">Magnitude</div>
      <div className="flex flex-col gap-1 mt-2">
        <div className="flex items-center"><span className="w-4 h-4 inline-block mr-2 bg-green-400"></span>0–1</div>
        <div className="flex items-center"><span className="w-4 h-4 inline-block mr-2 bg-yellow-300"></span>1–2</div>
        <div className="flex items-center"><span className="w-4 h-4 inline-block mr-2 bg-yellow-500"></span>2–3</div>
        <div className="flex items-center"><span className="w-4 h-4 inline-block mr-2 bg-orange-500"></span>3–5</div>
        <div className="flex items-center"><span className="w-4 h-4 inline-block mr-2 bg-red-500"></span>5–7</div>
        <div className="flex items-center"><span className="w-4 h-4 inline-block mr-2 bg-red-700"></span>7+</div>
      </div>
    </div>
  );
}

export default Legend;