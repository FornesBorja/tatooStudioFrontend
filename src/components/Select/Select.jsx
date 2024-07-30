import React from "react";

export const Select = ({ name, change, optionDisable, array }) => {
  return (
    <div className="select-container">
      <select name={name} onChange={change}>
        <option value="" selected disabled hidden>
          Please choose a {optionDisable}
        </option>
        {array.map((a) => {
          return(
            <option key={a.id} value={a.id}>
              {name === "artistId" ? a.firstName : a.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
