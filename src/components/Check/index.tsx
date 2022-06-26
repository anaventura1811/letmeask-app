import React from "react";

interface CheckIconProps  {
  stroke?: string;
}

export function CheckIcon(props: CheckIconProps) {
  const { stroke } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="9.004"
        stroke={`${stroke ? stroke : '#737380'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      ></circle>
      <path
        stroke={`${stroke ? stroke : '#737380'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8.443 12.34l2.168 2.167-.014-.014 4.89-4.891"
      ></path>
    </svg>
  );
}