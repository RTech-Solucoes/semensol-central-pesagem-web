import {Input, InputGroup, Textarea} from "@chakra-ui/react"
import {FieldErrorText, FieldHelperText, FieldLabel, FieldRequiredIndicator, FieldRoot} from "@chakra-ui/react/field"
import {ChangeEvent, ChangeEventHandler, KeyboardEvent, ReactNode} from "react";
import {withMask} from "use-mask-input"
import {Size, InputVariant} from "@/types/chakraui";

interface TextFieldProps {
  id?: string,
  label?: string,
  required?: boolean,
  helperText?: string,
  error?: string,
  errorText?: string,
  value: string,
  onChange?: (value: any) => void,
  onFileChange?: (value: any) => void,
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void,
  placeholder?: string,
  startElement?: ReactNode | string,
  endElement?: ReactNode | string,
  startAddon?: string,
  endAddon?: string,
  type?: string,
  accept?: string,
  mask?: string,
  maxLength?: number,
  disabled?: boolean,
  readOnly?: boolean,
  className?: string,
  labelClassName?: string,
  inputClassName?: string,
  helperTextClassName?: string,
  textarea?: boolean,
  rows?: number,
  size?: Size
  variant?: InputVariant,
}

export const TextField = ({
  id,
  label,
  required,
  helperText,
  error,
  errorText,
  value,
  onChange,
  onFileChange,
  onKeyDown,
  placeholder,
  startElement,
  endElement,
  startAddon,
  endAddon,
  type,
  accept,
  mask,
  maxLength,
  disabled,
  readOnly,
  className,
  labelClassName,
  inputClassName,
  helperTextClassName,
  textarea = false,
  rows,
  size = "md",
  variant = "subtle"
}: TextFieldProps) => {

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange?.(e.target.value)
    } else if (onFileChange && e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0])
    }
  }

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <FieldRoot
      className={className}
      required={required}
    >
      {label &&
        <FieldLabel className={labelClassName}>
          {label} <FieldRequiredIndicator />
        </FieldLabel>
      }
      <InputGroup
        startElement={startElement}
        endElement={endElement}
        startAddon={startAddon}
        endAddon={endAddon}
      >
        {textarea ?
          <Textarea
            id={id}
            value={value}
            onChange={handleTextareaChange}
            placeholder={placeholder}
            className={inputClassName}
            variant={variant}
            readOnly={readOnly}
            disabled={disabled}
            maxLength={maxLength}
            rows={rows}
          />
          :
          <Input
            id={id}
            value={value}
            onChange={handleInputChange}
            accept={accept}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={inputClassName}
            variant={variant}
            readOnly={readOnly}
            disabled={disabled}
            type={type}
            size={size}
            maxLength={maxLength}
            {...(mask ? {ref: withMask(mask)} : {})}
          />
        }
      </InputGroup>
      {helperText && <FieldHelperText className={helperTextClassName}>{helperText}</FieldHelperText>}
      {(error && errorText) && <FieldErrorText className={helperTextClassName}>{errorText}</FieldErrorText>}
    </FieldRoot>
  )
}