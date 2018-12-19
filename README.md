# react-validatus
> A simple to use and light-weight React validator component.


---
[![](https://img.shields.io/travis/tsevdos/react-validatus.svg)](https://travis-ci.org/tsevdos/react-validatus)
[![](https://img.shields.io/david/tsevdos/react-validatus.svg)](https://www.npmjs.com/package/react-validatus)
[![](https://img.shields.io/bundlephobia/minzip/react-validatus.svg)](https://www.npmjs.com/package/react-validatus)
[![](https://img.shields.io/npm/l/react-validatus.svg)](https://www.npmjs.com/package/react-validatus)
---


## The problem
You need to apply multiple validators on form inputs - and not only - and declaratively render a UI using these rules, by applying CSS classes, displaying custom error messages, etc.

## The solution
`react-validatus` is a simple and light-weight React Component that lets you apply as many validators you need and render your desired UI (by taking advantage of React's [render props](https://reactjs.org/docs/render-props.html) pattern). It's a wrapper of the excellent [validator.js](https://www.npmjs.com/package/validator) that does the heavy lifting of the validations.


## Installation
```
npm install --save react-validatus
```

## Usage
The `Validatus` component requires 2 props in order to work. The first one is the `value` that you want to validate, which **MUST** be of type **string**. The second one are the `validators` you want to apply for the previous `value`. The validators **MUST** be an **array of strings and / or objects**. You can view all the validators (names, options, etc.) at the [official documentation of validator.js](https://www.npmjs.com/package/validator#validators). Each validator will validate the `value` prop. With this in mind you can use any of the available validators simply by passing their names as strings (ex. "isEmail"). If you need to pass options to a validator you need to pass an object with the name of the validator as key and its options as the value (ex. { isLength: { min:3, max: 10} }).

Finally, you can render your UI of choice by passing a render function as `children` to the `Validatus` component. The specific function provides as argument an **object** with 2 keys. The first one is the `isValid` key that its type of **boolean** and is true only if **ALL** validators are passing (in any other case is false). The second object key `validations`, is an object with key names the names of the applied validators and values a **boolean** for their status (ex. `validations: { isEmail: true, isLength: false}`). If an individual validator is passing, the boolean value will be true otherwise will be false.

Example:

At the below example the value `email` will be validated with the following validators: **isRequired**, **isEmail**, **contains** and **isLength** (read more information about the [available validators](https://www.npmjs.com/package/validator#validators)). As you can see the last 2 validators have options. The **isValid** key will be true **ONLY** if all validators return true. You can also get individually every validation result from the **validations** object.

For more examples please check the [examples](https://github.com/tsevdos/react-validatus/blob/master/examples/examples.js) directory.

```js
import Validatus from "react-validatus";

<Validatus value="john@gmail.com" validators={["isRequired", "isEmail", { contains: "@gmail" }, { isLength: { min:3, max: 15} }]}>
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
```


## FAQ
### I want more examples.
Sure, have a look into the [examples](https://github.com/tsevdos/react-validatus/blob/master/examples/examples.js) directory.

### Where can I view **ALL** the available validators with the otpions / documentation?
[Here](https://www.npmjs.com/package/validator#validators) you can view all the available validators and their the otpions / documentation. Keep in mind that you can use only the validators, not the `sanitizers`.


## Contributing
Feel free to contribute (see below how you can build, lint and test the package).


### Setting up the development enviroment
You need to have node.js installed (any recent node / npm version will do). When you are ready, you can install all dependencies and run the webpack dev server by typing the below commands:

```
npm install
npm start
open http://localhost:3000
```

Feel free to change the port from `package.json`.

### Lint files
Lint all js files:

```
npm run lint
```

Auto-fix linting issues:
```
npm run lint:fix
```

### Run tests
Run all test by typing:
```
npm test
```

## License
MIT


## Authors
* [John Tsevdos](http://tsevdos.me)


## Known Issues / TODO
* isMobilePhone cannot accept the third argument (currently the Component supports only validators with maximum arity of 2).


## Acknowledgments
* [validator.js](https://www.npmjs.com/package/validator)
