import { Button } from "flowbite-react";
import React from "react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      {/* Left */}
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to Learn JavaScript?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources in Github to practise JavaScript
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://github.com/SanuliGehara/Learn-JavaScript"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn JavaScript
          </a>
        </Button>
      </div>

      {/* Right */}
      <div className="p-7 flex-1">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXQ5eVUWgzbrzU4s5VvOQbgGOVd72bgwlQpg&s" />
      </div>
    </div>
  );
}
