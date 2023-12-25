import React from "react";

export default function Page() {
  return (
    <>
      {Array.from(Array(20).keys()).map((e, idx) => (
        <p key={idx} className="text-2xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
          molestiae officiis sed porro eos adipisci corporis ab, laboriosam, sit
          alias iusto incidunt libero aperiam rem illum facere assumenda
          cupiditate unde.
        </p>
      ))}
    </>
  );
}
