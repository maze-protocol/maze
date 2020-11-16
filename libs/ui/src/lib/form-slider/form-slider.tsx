import React, {ReactNode, useState} from 'react';

import {
  Slider as MuiSlider,
  SliderProps as MuiSliderProps,
  FormControlProps,
  FormControlLabelProps,
  FormGroupProps,
  FormHelperTextProps,
  FormLabelProps,
  InputLabel
} from '@material-ui/core';

import { Field, FieldProps } from 'react-final-form';
import { FormHelperText } from '@material-ui/core';
import { FieldMetaState, useField } from 'react-final-form';

export interface ErrorMessageProps {
  showError: boolean;
  meta: FieldMetaState<any>;
  formHelperTextProps?: Partial<FormHelperTextProps>;
  helperText?: string;
}

export function ErrorMessage({
                               showError,
                               meta,
                               formHelperTextProps,
                               helperText
                             }: ErrorMessageProps) {
  if (showError) {
    return (
      <FormHelperText {...formHelperTextProps}>{meta.error || meta.submitError}</FormHelperText>
    );
  } else if (!!helperText) {
    return <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>;
  } else {
    return <></>;
  }
}

export interface showErrorProps {
  meta: FieldMetaState<any>;
}

const config = {
  subscription: {
    error: true,
    submitError: true,
    dirtySinceLastSubmit: true,
    touched: true,
    modified: true
  }
};

export function useFieldForErrors(name: string) {
  return useField(name, config);
}

export function showError({
                            meta: { submitError, dirtySinceLastSubmit, error, touched, modified }
                          }: showErrorProps) {
  return !!(((submitError && !dirtySinceLastSubmit) || error) && (touched || modified));
}

export interface FormSliderProps extends Partial<Omit<MuiSliderProps, 'onChange'>> {
  name: string;
  label?: ReactNode;
  onChangeMiddleware?: (
    currentValue: number | number[],
    newValue: number | number[]
  ) => number | number[];
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  fieldProps?: Partial<FieldProps<any, any>>;
  formControlProps?: Partial<FormControlProps>;
  formGroupProps?: Partial<FormGroupProps>;
  formLabelProps?: Partial<FormLabelProps>;
  formControlLabelProps?: Partial<FormControlLabelProps>;
  formHelperTextProps?: Partial<FormHelperTextProps>;
}

export function FormSlider(props: FormSliderProps) {
  const {
    name,
    label,
    onChangeMiddleware,
    disabled,
    required,
    helperText,
    fieldProps,
    formControlProps,
    formGroupProps,
    formLabelProps,
    formControlLabelProps,
    formHelperTextProps,
    ...restSlider
  } = props;

  const field = useFieldForErrors(name);
  const isError = showError(field);
  const [myLabel, setMyLabel] = useState(label)

  const handleOnChange = (
    onChange: (value: number | number[]) => void,
    currentValue: number | number[]
  ) => {
    setMyLabel(`${label} (${currentValue || 0}%)`);
    return (_event: any, value: number | number[]) => {
      if (onChangeMiddleware) {
        onChange(onChangeMiddleware(currentValue, value));
      } else {
        onChange(value);
      }
    };
  };

  return (
    <div>
      {label && <InputLabel>{myLabel}</InputLabel>}
      <Field
        name={name}
        render={({ input: { name, value, onChange, checked, ...restInput } }) => (
          <MuiSlider
            name={name}
            value={value}
            onChange={handleOnChange(onChange, value)}
            disabled={disabled}
            {...restSlider}
            {...restInput}
          />
        )}
        {...fieldProps}
      />
      <ErrorMessage
        showError={isError}
        meta={field.meta}
        formHelperTextProps={formHelperTextProps}
        helperText={helperText}
      />
    </div>
  );
}
