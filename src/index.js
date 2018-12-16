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
    return this.props.validators.reduce(this.validatorReducer, {});
  }

  validateInput(validations) {
    return Object.values(validations).every((val) => val);
  }

  validatorReducer = (obj, validator) => {
    const { value } = this.props;
    const validatorWithoutOptions = typeOf(validator) === "string";
    const validatorName = validatorWithoutOptions ? validator : Object.keys(validator)[0];
    const options = !validatorWithoutOptions && Object.values(validator)[0];
    const validationResult = validatorWithoutOptions
      ? Validations[validator](value)
      : Validations[validatorName](value, options);

    return { ...obj,  [validatorName]: validationResult };
  }

  render() {
    const validations = this.getValidations();
    const isValid = this.validateInput(validations);

    return this.props.children({ isValid, validations });
  }
}

export default Validatus;
