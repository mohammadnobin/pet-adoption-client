import React from "react";

const Title = ({titels,titese, disciption}) => {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-semibold md:font-bold text-primary mb-2 text-center">
        <span className="text-secondary">{titels}</span> {titese} 
      </h2>
      <p className="text-[#7f7e7e] mb-12 max-w-2xl mx-auto text-center">
    {disciption}
    </p>
    </div>
  );
};

export default Title;
