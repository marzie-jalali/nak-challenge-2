import styled from "@emotion/styled";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  required = false,
  error,
  ...props
}) => {
  return (
    <InputWrapper>
      {label && (
        <TextLabel>
          {label}
          {required && <RequiredStar>*</RequiredStar>}
        </TextLabel>
      )}
      <StyledInput {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default CustomInput;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextLabel = styled.label`
  color: #242424;
  font-size: 14px;
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ababab;
  border-radius: 0.25rem;
  outline: none;
`;

const RequiredStar = styled.span`
  color: #dc362e;
  margin-left: 4px;
`;

const ErrorMessage = styled.p`
  color: #dc362e;
  font-size: 12px;
  margin-top: 4px;
`;
