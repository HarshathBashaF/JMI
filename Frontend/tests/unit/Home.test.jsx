import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../../src/pages/Home";

describe("Home page unit tests", () => {
  it("renders the home feature section", () => {
    render(<Home navigateToDashboard={() => {}} />);
    expect(screen.getByText(/Real-time Job Insights/i)).toBeInTheDocument();
  });

  it("renders the features list", () => {
    render(<Home navigateToDashboard={() => {}} />);
    expect(screen.getByText(/Top Skills Analysis/i)).toBeInTheDocument();
  });
});
