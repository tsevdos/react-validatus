import React from "react";
import { render, cleanup, wait } from "react-testing-library";
import "jest-dom/extend-expect";
import Validatus from "./index";

describe("Validatus", () => {

  afterEach(cleanup);

  it("returns an object with isValid true and an array of all the individual validators with their results and options", () => {
    const renderChildren = jest.fn(({ isValid, _validations }) => <div>{ isValid }</div>);
    render(
      <Validatus value={"john"} validators={["isRequired", { isLength: { min:3, max: 15} }]}>
        { renderChildren }
      </Validatus>,
    );
    const expectedObj = {
      isValid: true,
      validations: [
        {
          isRequired: true,
        },
        {
          isLength: true,
          options: { max: 15, min: 3 }
        },
      ]
    };

    expect(renderChildren.mock.calls.length).toBe(1);
    expect(renderChildren).toBeCalledWith(expectedObj);
  });

  xit("renders correctly the expected JSX", () => {
    const renderChildren = ({ isValid, validations }) => (
      <div>
        { isValid && <span>Is valid</span> }
        { validations.isRequired }
        { validations.isRequired && <span>Is required</span> }
        {
          validations.isLength &&
            <span>{`Has length between ${validations.options.min} and ${validations.options.max}`}</span>
        }
      </div>
    );
    const { container, getByTestId, getByText } = render(
      <Validatus value={"john"} validators={["isRequired", { isLength: { min:3, max: 15} }]}>
        { renderChildren }
      </Validatus>,
    );
    console.log(container.innerHTML)
    // const isValidSpan = getByText("Is valid");
    // const isRequiredSpan = getByText("Is required");
    // const isLengthSpan = getByText("Has length between");

    expect(getByText("Is valid")).toBeInTheDocument();
    // expect(isValidSpan).toHaveTextContent("Is valid");

    expect(getByText("Is required")).toBeInTheDocument();
    // expect(isRequiredSpan).toHaveTextContent("Is required");

    // expect(getByTestId("isRequired")).toBeInTheDocument();
    // expect(getByTestId("isLength")).toBeInTheDocument();
  });

  it("returns an object with isValid false and an array of all the individual validators with their results and options", () => {
    const renderChildren = jest.fn(({ isValid, _validations }) => <div>{ isValid }</div>);
    render(
      <Validatus value={"john@gmail.com"} validators={["isEmail", { contains: "@gmail" }, { isLength: { max: 5} }]}>
        { renderChildren }
      </Validatus>,
    );
    const expectedObj = {
      isValid: false,
      validations: [
        {
          isEmail: true,
        },
        {
          contains: true,
          options: "@gmail",
        },
        {
          isLength: false,
          options: { max: 5 }
        },
      ]
    };

    expect(renderChildren.mock.calls.length).toBe(1);
    expect(renderChildren).toBeCalledWith(expectedObj);
  });

  xit("renders correctly the expected JSX", () => {
    const renderChildren = ({ isValid, validations }) => (
      <div>
        { isValid && <span data-testid="isValid">Is valid</span> }
        <span data-testid="isEmail">{ validations.isEmail && "Is email" }</span>
        <span data-testid="isLength">
          {
            validations.isLength &&
              `Has length at least ${validations.options.max} characters`
          }
        </span>
      </div>
    );
    const { getByTestId } = render(
      <Validatus value={"john@gmail.com"} validators={["isEmail", { contains: "@gmail" }, { isLength: { max: 5} }]}>
        { renderChildren }
      </Validatus>,
    );

    expect(getByTestId("isValid")).not.toBeInTheDocument();
    // expect(getByTestId("isRequired")).toBeInTheDocument();
    // expect(getByTestId("isLength")).toBeInTheDocument();
  });

});
