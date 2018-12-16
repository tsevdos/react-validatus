import React from "react";
import "react-testing-library/cleanup-after-each";
import { render } from "react-testing-library";
import Validatus from "./index";

describe("Validatus", () => {

  it("returns an object with isValid true and a correct validations object", () => {
    const renderChildren = jest.fn(({ isValid, _validations }) => <div>{ isValid }</div>);
    render(
      <Validatus value={"john"} validators={["isRequired", { isLength: { min: 3, max: 15 } }]}>
        { renderChildren }
      </Validatus>,
    );
    const expectedObj = {
      isValid: true,
      validations: {
        isRequired: true,
        isLength: true
      }
    };

    expect(renderChildren.mock.calls.length).toBe(1);
    expect(renderChildren).toBeCalledWith(expectedObj);
  });

  it("returns an object with isValid false and a correct validations object", () => {
    const renderChildren = jest.fn(({ isValid, _validations }) => <div>{ isValid }</div>);
    render(
      <Validatus value={"john@gmail.com"} validators={["isEmail", { contains: "@gmail" }, { isLength: { max: 5} }]}>
        { renderChildren }
      </Validatus>,
    );
    const expectedObj = {
      isValid: false,
      validations: {
        isEmail: true,
        contains: true,
        isLength: false
      }
    };

    expect(renderChildren.mock.calls.length).toBe(1);
    expect(renderChildren).toBeCalledWith(expectedObj);
  });

  it("renders the correct the contents of render prop", () => {
    const renderChildren = ({ isValid, validations: { isRequired, isLength } }) => (
      <div>
        { isValid && <span>Is valid</span> }
        { isRequired && <span>Is required</span> }
        { isLength && <span>Has length between 3 and 15</span> }
      </div>
    );
    const { container } = render(
      <Validatus value={"john"} validators={["isRequired", { isLength: { min:3, max: 15} }]}>
        { renderChildren }
      </Validatus>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders the correct the contents of render prop", () => {
    const renderChildren = ({ isValid, validations: { isEmail, contains, isLength } }) => (
      <div>
        { isValid && <span data-testid="isValid">Is valid</span> }
        { isEmail && <span>Is email</span> }
        { contains && <span>Contains @gmail</span> }
        { isLength && <span>Has max length 5</span> }
      </div>
    );
    const { container } = render(
      <Validatus value={"john@gmail.com"} validators={["isEmail", { contains: "@gmail" }, { isLength: { max: 5} }]}>
        { renderChildren }
      </Validatus>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

});
