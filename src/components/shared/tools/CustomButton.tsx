import styled from "@emotion/styled";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  type = "button",
}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} type={type}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;

const StyledButton = styled.button<{ disabled?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ disabled }) => (disabled ? "#F1F1F1" : "#242424")};
  color: ${({ disabled }) => (disabled ? "#ABABAB" : "#F1F1F1")};
`;
