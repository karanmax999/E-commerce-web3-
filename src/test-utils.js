// test-utils.js
import React from "react";
import { render } from "@testing-library/react";
import { Web3Provider } from "./web3Context";

const renderWithWeb3 = (ui, options) =>
  render(<Web3Provider>{ui}</Web3Provider>, options);

export * from "@testing-library/react";
export { renderWithWeb3 };
