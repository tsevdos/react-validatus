import { Component } from "react";
import PropTypes from "prop-types";
import typeOf from "./lib/util/typeOf";
import Validations from "./lib/index";

class Validatus extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    validators: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
      ])
    ).isRequired,
    children: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: "",
    validators: [],
    children: () => {}
  }

  getValidations() {
    return this.props.validators.map((validator) => this._getValidator(validator));
  }

  _getValidator(validator) {
    const { value } = this.props;

    if (typeOf(validator) === "string") {
      return {
        [validator]: Validations[validator](value)
      };
    }

    if (typeOf(validator) === "object") {
      const validatorName = Object.keys(validator)[0];
      const options = Object.values(validator)[0];

      if (options) {
        return {
          [validatorName]: Validations[validatorName](value, options),
          options
        };
      }
    }
  }

  validateInput(validations) {
    const validationsResults = validations.map((validation) => {
      const { _options, ...result } = validation;
      return Object.values(result)[0];
    });

    return validationsResults.every((val) => val);
  }

  render() {
    const validations = this.getValidations();
    const isValid = this.validateInput(validations);

    return this.props.children({ isValid, validations });
  }
}

export default Validatus;
