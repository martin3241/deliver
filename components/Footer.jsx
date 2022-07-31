import React from "react";
import Year from "./CurrentYear";

export default function Footer() {
  return (
    <footer>
      <div className="p-4  bg-neutral-800 flex flex-col ">
        <div className="max-w-7xl ml-7 text-white ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 ">
            <div className="pr-10 ">
              <h4 className="text-2xl pb-4">Company</h4>

              <ul>
                <li className="pb-4">
                  Cryptogatan 3b
                  <br />
                </li>
                <li className="pb-4">
                  Stockholm
                  <br />
                </li>
                <li className="pb-4">
                  Sweden
                  <br />
                </li>
                <li className="pb-4">
                  <strong>Phone: </strong> +46 736 88 56 99 <br />
                </li>
                <li className="pb-4">
                  <strong>Email: </strong> company@email.com
                  <br />
                </li>
              </ul>
            </div>

            <div className=" static">
              <h4 className="text-2xl pb-4">Useful links</h4>
              <ul>
                <li className="pb-4">
                  <a href="/" className="hover:text-yellow-500">
                    Home
                  </a>
                </li>
                <li className="pb-4">
                  <a href="/about" className="hover:text-yellow-500">
                    About us
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Services
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Terms of Services
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-5 pr-10 absolute top-30 right-10 w-80  ">
              <h4 className="text-2xl pb-4">Join our newsletter</h4>
              <p className="pb-4">
                Join 25.000+ others and never miss out on new tips, tutorials
                and more!
              </p>
              <form className="flex flex-row flex-wrap">
                <input
                  className="pb-4 w-2/3 p-3 focus:border-yellow-500"
                  placeholder="email@example.com"
                  type="text"
                  name=""
                  id=""
                />
                <button className="p-2 w-1/3 bg-yellow-500 text-white hover:bg-yellow-500">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="px-10 w-full bg-gray-900 text-gray-500 ">
        <div className="text-center bg ">
          <div className="mb-0 ">
            <p>
              Copyright © <Year />
              <strong>
                <span>. Awesome company Inc.</span>
              </strong>
              . All rights reserved.
            </p>
          </div>

          <div className="flex flex-row justify-center items-center ">
            <ul className="flex flex-row pb-1 items-center">
              <li>
                <a href="#">
                  <img src="./linkedin.png" className="h-10 w-10 mx-1 pt-1" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="./facebook.png" className="h-10 w-10 mx-1 pt-1" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="./instagram.png" className="h-10 w-10 mx-1 pt-1" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="./twitter.png" className="h-10 w-10 mx-1 pt-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
