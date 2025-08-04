import React from 'react'

const Title = ({ title, subTitle, align = 'center', font = 'font-bold', color = 'text-gray-400' }) => {
  const alignmentClass = align === 'left' ? 'md:items-start md:text-left' : 'items-center text-center';

  return (
    <div className={`flex flex-col justify-center ${alignmentClass}`}>
      <h1 className={`text-3xl md:text-4xl ${font} text-white`}>{title}</h1>
      <p className={`text-sm md:text-base ${color} mt-2 max-w-xl`}>
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
