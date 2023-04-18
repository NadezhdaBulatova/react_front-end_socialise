import React from "react";
import MainBg from "../components/MainBg";
import { useTestMutation } from "../store/services/api";

const Translation = () => {
  const [make_request, { data }] = useTestMutation();
  console.log("DATA", data);

  const test = async (userRequest) => {
    const response = await make_request(userRequest).unwrap();
    console.log(response);
  };
  return (
    <MainBg>
      <button
        onClick={() => test({ question: "what is the highest mountain" })}
      >
        Click me
      </button>
    </MainBg>
  );
};

export default Translation;
