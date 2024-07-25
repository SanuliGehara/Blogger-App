import React from "react";
import CallToAction from "../components/CallToAction";

function Projects() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-10">
      <div className="max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-10 bg-purple-50 rounded-xl">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="text-md text-gray-500">
          Build fun and engaging projects while learning HTML, CSS, and
          JavaScript. You can learn and improve your knowledge on other
          programming languages like Python and Java!
        </p>
        <CallToAction />
      </div>
    </div>
  );
}

export default Projects;
