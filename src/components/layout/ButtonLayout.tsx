import styled from "@emotion/styled";

const ButtonLayout = ({ children }: { children: React.ReactNode }) => {
  return <ButtonContainer>{children}</ButtonContainer>;
};

export default ButtonLayout;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;
