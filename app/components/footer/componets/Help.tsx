import React from "react";

export const Help = () => {
  return (
    <div className="flex flex-col p-4">
      <h1 className="font-bold">Help</h1>
      <a className="underline" href="/contact">
        <p>Customer support</p>
      </a>
      <a className="underline" href="/citations">
        <p>Citations</p>
      </a>
    </div>
  );
};
