import React from "react";

export default function FillerText() {
  return (
    <div>
      <div>
        <p>
          Worried about something crypto related? <br />
          Give money to{" "}
          <a href="#" className="hover:text-yellow-500">
            Crypto Company Inc.
          </a>{" "}
          so they will fix it!
        </p>
      </div>
      <div className="p-5 flex items-center justify-center">
        <p>
          <a href="#" className=" ">
            See their 900+ reviews on{" "}
          </a>
        </p>
        <img src="./trustpilot.png" className="h-12 w-31 mx-1  " />
      </div>
    </div>
  );
}
