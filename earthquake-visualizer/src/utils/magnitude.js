export const getColor = (mag) => {
  if (mag >= 6) return "#b91c1c"; 
  if (mag >= 4) return "#f97316"; 
  if (mag >= 2) return "#facc15"; 
  return "#22c55e"; 
};

export const getRadius = (mag) => Math.max(4, mag * 3);
