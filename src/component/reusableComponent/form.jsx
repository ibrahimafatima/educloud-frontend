import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import TextArea from "./textArea";

class Form extends Component {
  state = {
    data: {},
    error: {}
  };

  handleSubmit = e => {
    e.preventDefault();

    const error = this.validate();
    this.setState({ error: error || {} });
    if (error) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    //console.log(this.validate());
    const error = { ...this.state.error };
    const errorMessage = this.validateInput(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, error });
  };

  validateInput = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (!error) return null;
    return error.details[0].message;
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  renderButton(label, type) {
    return (
      <button
        disabled={this.validate()}
        className={type}
        style={{ fontSize: "100%" }}
      >
        {label}
      </button>
    );
  }

  renderTextArea(label, name, type, shape) {
    const { data, error } = this.state;
    return (
      <TextArea
        label={label}
        name={name}
        type={type}
        className={shape}
        onChange={this.handleChange}
        value={data[name]}
        error={error[name]}
      />
    );
  }

  renderInput(label, name, type, shape) {
    const { data, error } = this.state;
    return (
      <Input
        label={label}
        name={name}
        type={type}
        className={shape}
        onChange={this.handleChange}
        value={data[name]}
        error={error[name]}
      />
    );
  }
  renderSelect(name, options) {
    const { data, error } = this.state;
    return (
      <Select
        name={name}
        options={options}
        onChange={this.handleChange}
        value={data[name]}
        error={error[name]}
      />
    );
  }
}

export default Form;
