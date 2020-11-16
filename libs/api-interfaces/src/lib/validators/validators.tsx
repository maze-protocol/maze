// import {Scalar, Validator, ValidatorContainer, ValidatorFunction} from "@maze/api-interfaces";
import {setIn} from "final-form";

export const yupValidator = (schema) => async (values) => {
  console.warn(values)
  if (typeof schema === 'function') {
    schema = schema();
  }
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (err) {
    const errors = err.inner.reduce((formError, innerError) => {
      console.warn(formError, innerError)
      return setIn(formError, innerError.path, innerError.message);
    }, {});
    return errors;
  }
};

// export class AbstractValidator implements Validator {
//   _message: string = '';
//   _value: any = undefined;
//   _validator : ValidatorFunction = (value: any) => true;
//   get message() {
//     return this._message.replace('{0}', this._value);
//   }
//   set message(message: string) {
//     this._message = message;
//   }
//   set validator(validator: ValidatorFunction) {
//     this._validator = validator;
//   }
//   isValid(value: any) {
//     this._value = value;
//     return this._validator(value);
//   }
// }
//
// export const ValidatorFactory = (isValid :ValidatorFunction, message :string) => {
//   const validator = new AbstractValidator()
//   validator.message = message;
//   validator.validator = isValid;
//   return validator;
// }
//
// export const notEmpty: Validator = ValidatorFactory(value => !!value, 'Required');
// export const isUrl: Validator = ValidatorFactory(value => {
//   if (!value) {
//     return true;
//   }
//   let url;
//   try {
//     url = new URL(value);
//   } catch {
//     return false;
//   }
//   return (url.protocol === "http:" || url.protocol === "https:") && url.host.match(/\.[a-z]{2,}$/) ;
// }, 'Not URL');
//
// export const isMatch = (regexp: RegExp) : Validator  => ValidatorFactory(value => !value || regexp.test(value), "Not match");
//
// const validateScalarBySingle = (value : any, validator : Validator) => validator.isValid(value) ? true : validator.message;
// const validateScalarByContainer = (value : any, validators : Array<Validator>) => {
//   let validator;
//   for (validator of validators) {
//     if (!validator.isValid(value)) {
//       return validator.message;
//     }
//   }
//   return true;
// }
// const validateScalar = (value: any, validator : Validator | Array<Validator>) => Array.isArray(validator) ?
//   validateScalarByContainer(value, validator) :
//   validateScalarBySingle(value, validator);
// const validateArray = (value: Array<any>, validator : Validator | Array<Validator>) => {
//   let scalar;
//   let result;
//   const errors = [];
//   for (let i in value) {
//     scalar = value[i];
//     result = validateScalar(scalar, validator);
//     if (result !== true) {
//       errors[i] = result;
//     }
//   }
//   return errors.length ? errors : true;
// }
// const validate = (value: any|Array<any>, validator: Validator | Array<Validator>) => Array.isArray(value) ?
//   validateArray(value, validator) :
//   validateScalar(value, validator);
//
// export const groupValidator = (validators : ValidatorContainer) => (values) => {
//   console.warn(values)
//   const errors = {};
//   Object.keys(validators).forEach(field => {
//     const result = validate(values[field] || null, validators[field]);
//     if (result !== true) {
//       errors[field] = result;
//     }
//   })
//   console.warn(errors);
//   return errors;
// }
