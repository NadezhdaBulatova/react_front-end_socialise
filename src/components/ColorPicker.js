import React from "react";
import { useState } from "react";
import { SliderPicker, AlphaPicker } from "react-color";

const ColorPicker = ({ onChange }) => {
  const [color, setColor] = useState({
    r: 200,
    g: 50,
    b: 10,
    a: 0.5,
  });
  const [alpha, setAlpha] = useState(0);
  const handleColorChange = (color) => {
    setColor(color.rgb);
  };

  const fontSize = getComputedStyle(document.documentElement).fontSize;

  return (
    <div className="relative w-full">
      <SliderPicker
        color={color}
        onChange={handleColorChange}
        className="h-fit justify-center space-y-0 mb-[20px]"
      />
      <AlphaPicker
        color={color}
        onChange={handleColorChange}
        width={10 * fontSize}
      />
    </div>
  );
};

export default ColorPicker;
