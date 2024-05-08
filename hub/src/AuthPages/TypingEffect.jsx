import React, { useEffect, useState } from 'react';

const TypingEffect = ({ text, colors }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index === text.length) {
        setDisplayText('');
        setIndex(0);
        setCurrentColorIndex(0);
      } else {
        setDisplayText((prevText) => {
          const nextChar = text[index];
          const colorClass = colors[currentColorIndex % colors.length];
          setCurrentColorIndex((prevColorIndex) => prevColorIndex + 1);
          return prevText + `<span class="${colorClass}">${nextChar}</span>`;
        });
        setIndex((prevIndex) => prevIndex + 1);
      }
    }, 900); 

    return () => clearInterval(interval);
  }, [text, colors, index, currentColorIndex]);

  return <div dangerouslySetInnerHTML={{ __html: displayText }} />;
};

export default TypingEffect;
