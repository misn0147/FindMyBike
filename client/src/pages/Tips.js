import React from "react";
import biketips from "../assets/images/biketips.jpg";
import "../assets/styles/tips.css";

const Tips = () => {
  return (
    <div className="p-20">
      <div className="flex justify-around">
        <img
          width="50%"
          className="imgborder"
          src={biketips}
          alt="simple graphic of a locked up bike"
        />
        <div className="ml-10">
          <div className="p-1 text-center">
            <h2><span className="dark:text-gray-200">Tips and Tricks!</span></h2>
          </div>
          <div className="pt-1">
            <dl className="list-disc text-left">
              <div className="tip dark:text-gray-200">
                Add your information early before your bike goes missing!
              </div>
              <li className="dark:text-gray-200">
                Serial Numbers are hard to remember and it's one of the most
                important factors in determining bike ownership.
              </li>
              <div className="tip dark:text-gray-200">Be thorough with your descriptions!</div>
              <li className="dark:text-gray-200">
                Listing things like the custom hardware as well as any unique
                identifying features such as scratches or scuffs will help prove
                the bike is yours!
              </li>
              <div className="tip dark:text-gray-200">
                Be on the look-out for other missing bikes!
              </div>
              <li className="dark:text-gray-200">
                An active community will help lower the number of missing bikes
                in your area!
              </li>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;
