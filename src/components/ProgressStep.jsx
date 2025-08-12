import React from 'react';

const ProgressStep = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
              index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            {index + 1}
          </div>
          <span
            className={`ml-2 mr-4 font-semibold ${
              index <= currentStep ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <div className="w-12 h-[2px] bg-gray-300 mx-2"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressStep;
