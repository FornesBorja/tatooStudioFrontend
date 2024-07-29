import React from "react";

export const Select = ({ name, change, optionDisable, array }) => {
  return (
    <div>
      <select name={name} onChange={change}>
        <option value="" selected disabled hidden>
          Please choose a {optionDisable}
        </option>
        {array.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>
    </div>
  );
};
