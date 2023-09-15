const colors = [
    '#FF0000', /*Red*/ 	 	
    '#FFFFFF', /*White*/
    '#00FFFF', /*Cyan*/ 	 	
    '#C0C0C0', /*Silver*/
    '#0000FF', /*Blue*/ 	 
    '#808080', /*Gray*/
    '#00008B', /*DarkBlue*/ 	 	
    '#ADD8E6', /*LightBlue*/ 	 	
    '#FFA500', /*Orange*/
    '#800080', /*Purple*/ 	 	
    '#A52A2A', /*Brown*/
    '#FFFF00', /*Yellow*/ 	 	
    '#800000', /*Maroon*/
    '#00FF00', /*Lime*/ 	 	
    '#008000', /*Green*/
    '#FF00FF', /*Magenta*/ 	 	
    '#808000', /*Olive*/
    '#FFC0CB', /*Pink*/ 	 	
    '#7FFFD4' /*Aquamarine*/
    ];
    
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