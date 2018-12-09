
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Validatus from "../src/index";

class App extends Component {
  state = {
    email: "",
    number: ""
  }

  updateInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, number } = this.state;

    return(
      <div className="container">
        <div className="row">
          <form>
            <Validatus value={email} validators={["isRequired", "isEmail", { contains: "@gmail" }, { isLength: { min:3, max: 15} }]}>
              {
                ({ isValid, validations }) =>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      id="email"
                      type="text"
                      name="email"
                      value={email}
                      onChange={this.updateInput}
                      className={`form-control ${!isValid && "is-invalid"}`}
                      placeholder="Enter email"
                    />
                    { !validations[0].isRequired && <div className="invalid-feedback">Field is required</div> }
                    { !validations[1].isEmail && <div className="invalid-feedback">Field must be a valid email</div> }
                    { !validations[2].contains && <div className="invalid-feedback">Field must contain {validations[2].options}</div> }
                    { !validations[3].isLength && <div className="invalid-feedback">Length must be between {validations[3].options.min} and {validations[3].options.max}</div> }
                  </div>
              }
            </Validatus>
            <Validatus value={number} validators={["isRequired", { isInt: { min: 10, max: 99 } }]}>
              {
                ({ isValid, validations }) =>
                  <div className="form-group">
                    <label htmlFor="number">Number (min: 10, max: 99)</label>
                    <input
                      id="number"
                      type="text"
                      name="number"
                      value={number}
                      onChange={this.updateInput}
                      className={`form-control ${!isValid && "is-invalid"}`}
                      placeholder="Enter number"
                    />
                    { !validations[0].isRequired && <div className="invalid-feedback">Field is required</div> }
                    { !validations[1].isInt && <div className="invalid-feedback">Field must be an intiger between {validations[1].options.min} and {validations[1].options.max}</div> }
                  </div>
              }
            </Validatus>
          </form>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("⚛"));
