

const colors = [
  // Red
  {segment: "#FF0000", text: 'black'},
  // Green
  {segment: "#008000", text: 'black'},
  // Blue
  {segment: "#0000FF", text: 'white'},
  // White
  {segment: "#FFFFFF", text: 'black'},
  // Yellow
  {segment: "#FFFF00", text: 'black'},
  // Purple
  {segment: "#800080", text: 'white'},
  // Cyan
  {segment: "#00FFFF", text: 'black'},
  // Magenta
  {segment: "#FF00FF", text: 'black'},
  // Gray
  {segment: "#808080", text: 'black'},
  // Dark Red
  {segment: "#8B0000", text: 'white'},
  // Dark Green
  {segment: "#006400", text: 'white'},
  // Dark Blue
  {segment: "#00008B", text: 'white'},
  // Dark Gray
  {segment: "#A9A9A9", text: 'black'},
  // Light Gray
  {segment: "#D3D3D3", text: 'black'},
  // Brown
  {segment: "#A52A2A", text: 'white'},
  // Orange
  {segment: "#FFA500", text: 'black'},
  // Pink
  {segment: "#FFC0CB", text: 'black'},
  // Gold
  {segment: "#FFD700", text: 'black'},
  // Silver
  {segment: "#C0C0C0", text: 'black'},
  // Lavender
  {segment: "#E6E6FA", text: 'black'},
  // Teal
  {segment: "#008080", text: 'black'},
  // Olive
  {segment: "#808000", text: 'white'},
  // Maroon
  {segment: "#800000", text: 'white'},
]
    
    export const getShuffledColors = (numSegments) => {
    let shuffledColors = [];
    let availableColors = [...colors]

    while (shuffledColors.length < numSegments) {
      const colorIndex = Math.floor(Math.random() * availableColors.length);

      const color = availableColors[colorIndex % availableColors.length];
      shuffledColors.push(color)

      availableColors.splice(colorIndex, 1)

      availableColors = availableColors.length === 0 ? [...colors] : availableColors;
    }
    return shuffledColors
  };