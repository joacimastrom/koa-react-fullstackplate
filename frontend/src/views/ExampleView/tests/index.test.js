import React from "react";
import { shallow } from "enzyme";

import ExampleView from "../";
describe("TestView", () => {
  it("should render a button", () => {
    const renderedComponent = shallow(<ExampleView />);
    expect(renderedComponent.find("button")).toBeDefined();
  });
});
