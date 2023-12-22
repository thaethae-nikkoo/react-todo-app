import React from "react";

export default function CheckallAndRemaining({
  remainingCount,
  checkAll,
  uncheckAll,
}) {
  return (
    <>
      <div className="check-all-container">
        <div className="d-flex justify-content-around ">
          <div className="button" onClick={checkAll}>
            Check All
          </div>

          <div className="button" onClick={uncheckAll}>
            Uncheck all
          </div>
        </div>

        <span>
          {remainingCount} item{remainingCount > 1 ? "s" : ""} remaining
        </span>
      </div>
    </>
  );
}
