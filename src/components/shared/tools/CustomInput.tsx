import styled from '@emotion/styled';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const CustomInput :React.FC<CustomInputProps> = ({ label,required = false, ...props }) => {
  return (
    <InputWrapper>
    {label && <TextLabel>{label}{required && <RequiredStar>*</RequiredStar>}</TextLabel>}
    <StyledInput {...props} />
  </InputWrapper>
  )
}

export default CustomInput

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
  border: 1px solid #ABABAB;
  border-radius: 0.25rem;
  outline: none;
`;

const RequiredStar = styled.span`
  color: #DC362E;
  margin-left: 4px;
`;