import React from "react";
import SettingsDropdown from "./SettingsDropDown";

export default function Navbar() {
  return (
    <header className="bg-neutral-800 border-b-2 border-white-100 ">
      <div className="p-3 flex justify-between pl-10 pr-10 gap-x-10 items-center">
        <div className="flex">
          <a href="/">
            <img src="./logo.png" className="h-10 w-10" />
          </a>
          <h1 className="my-auto pl-5 text-gray-300 text-2xl">
            Crypto Compare
          </h1>
        </div>
        <ul className="flex gap-x-10 items-center text-white font-bold">
          <li className="hover:bg-gray-700  py-2 px-4 rounded">Blog</li>
          <li className=" hover:bg-gray-700 py-2 px-4 rounded">Currency ▾</li>

          <li className=" hover:bg-gray-700  py-2 px-4 rounded">
            <SettingsDropdown />
          </li>
        </ul>
      </div>
    </header>
  );
}
