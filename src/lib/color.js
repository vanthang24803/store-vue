export function generateColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.5)`
    );
  }
  return colors;
}
