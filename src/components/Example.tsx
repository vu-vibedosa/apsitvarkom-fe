import React, { useEffect, useState } from "react";
import getExample from "../backEndClient";

// Define type of what will "come back" from the back end
export type ExampleModel = {
  text: string;
};

const Example: React.FC = () => {
  // This will store data/state from back end
  const [beMessage, SetBeMessage] = useState<ExampleModel>({
    // Initialize with some default value until it's loaded by useEffect hook
    text: "Loading",
  });

  // Make GET request to /example back end endpoint
  useEffect(() => {
    getExample()
      .then((response) => {
        SetBeMessage(response.data);
      })
      .catch(() => {
        SetBeMessage({
          text: "Failed to fetch from back end. Is the back end running?",
        });
      });
  }, []);

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2
            className="text-lg font-semibold 
          text-indigo-600"
          >
            Apsitvarkom example
          </h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            FE: Hello from front end!
          </p>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            BE: {beMessage.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Example;
