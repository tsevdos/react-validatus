
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Validatus from "../src/index";

const isUrlHttpOrHttps = {
  isURL: {
    protocols: ["http", "https"],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true
  }
};

const hasLengthMoreThanTen = {
  isLength: { min: 10 }
};


class App extends Component {
  state = {
    email: "",
    text: "",
    number: "",
    url: "",
    textTouched: false
  }

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  updateInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  setTextInputAsTouched = () => {
    this.setState({ textTouched: true });
  }

  render() {
    const { email, text, number, url, textTouched } = this.state;

    return(
      <div className="container">

        <div className="row">
          <div className="col-sm">
            <h1 className="mt-5 mb-5">Validatus examples</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-sm mb-5">
            <h3>Basic example</h3>
            <form>
              <Validatus value={email} validators={["isRequired", "isEmail", { contains: "@gmail" }, { isLength: { min:3, max: 15 } }]}>
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
                      { !validations.isRequired && <div className="invalid-feedback">Field is required</div> }
                      { !validations.isEmail && <div className="invalid-feedback">Field must be a valid email</div> }
                      { !validations.contains && <div className="invalid-feedback">Field must contain &quot;@gmail&quot;</div> }
                      { !validations.isLength && <div className="invalid-feedback">Length must be between 3 and 15</div> }
                    </div>
                }
              </Validatus>
            </form>
          </div>
          <hr />
        </div>

        <div className="row">
          <div className="col-sm mb-5">
            <h3>Touched input example</h3>
            <form>
              <Validatus value={text} validators={["isRequired", "isAlpha", { contains: "valid" }, { isLength: { min:10, max: 30} }]}>
                {
                  ({ isValid, validations }) =>
                    <div className="form-group">
                      <label htmlFor="text">Only valid text here</label>
                      <input
                        ref={this.textInput}
                        onBlur={this.setTextInputAsTouched}
                        id="text"
                        type="text"
                        name="text"
                        value={text}
                        onChange={this.updateInput}
                        className={`form-control ${(textTouched && !isValid) && "is-invalid"}`}
                        placeholder="Enter text"
                      />
                      { (textTouched && !validations.isRequired) && <div className="invalid-feedback">Field is required</div> }
                      { (textTouched && !validations.isAlpha) && <div className="invalid-feedback">Field must contain only letters (a-zA-Z).</div> }
                      { (textTouched && !validations.contains) && <div className="invalid-feedback">Field must contain &quot;valid&quot;</div> }
                      { (textTouched && !validations.isLength) && <div className="invalid-feedback">Length must be between 10 and 30</div> }
                    </div>
                }
              </Validatus>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-sm mb-5">
            <h3>Destructuring validations object</h3>
            <form>
              <Validatus value={number} validators={["isRequired", { isInt: { min: 10, max: 99 } }]}>
                {
                  ({ isValid, validations: { isRequired, isInt } }) =>
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
                      { !isRequired && <div className="invalid-feedback">Field is required</div> }
                      { !isInt && <div className="invalid-feedback">Field must be an intiger between 10 and 99</div> }
                    </div>
                }
              </Validatus>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-sm mb-5">
            <h3>With configuration objects</h3>
            <form>
              <Validatus value={url} validators={[isUrlHttpOrHttps, hasLengthMoreThanTen]}>
                {
                  ({ isValid, validations: { isURL, isLength } }) =>
                    <div className="form-group">
                      <label htmlFor="number">URL http(s)</label>
                      <input
                        id="url"
                        type="text"
                        name="url"
                        value={url}
                        onChange={this.updateInput}
                        className={`form-control ${!isValid && "is-invalid"}`}
                        placeholder="Enter url"
                      />
                      {
                        !isURL && <div className="invalid-feedback">
                          Field must be a valid url ({isUrlHttpOrHttps.isURL.protocols[0]}/{isUrlHttpOrHttps.isURL.protocols[1]})
                        </div>
                      }
                      {
                        !isLength && <div className="invalid-feedback">
                          Field must have length more than {hasLengthMoreThanTen.isLength.min}</div>
                      }
                    </div>
                }
              </Validatus>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("⚛"));
