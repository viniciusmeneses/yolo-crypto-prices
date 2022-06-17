import { FocusEvent, InputHTMLAttributes, LabelHTMLAttributes, useCallback, useState } from "react";

import { StyledContainer, StyledErrorText, StyledInput, StyledLabel } from "./styles";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  fullWidth?: boolean;
  error?: string;
};

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  focus: boolean;
  shrink: boolean;
  invalid: boolean;
};

export const Input = ({
  label,
  name,
  value,
  error,
  fullWidth = false,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const onInputFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const onInputBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  return (
    <StyledContainer fullWidth={fullWidth}>
      {label && (
        <StyledLabel
          htmlFor={name}
          shrink={isFocused || Boolean(value)}
          focus={isFocused}
          invalid={Boolean(error)}
        >
          {label}
        </StyledLabel>
      )}
      <StyledInput
        type="text"
        id={name}
        name={name}
        value={value}
        error={error}
        fullWidth={fullWidth}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        {...props}
      />

      {error && <StyledErrorText>{error}</StyledErrorText>}
    </StyledContainer>
  );
};
