import styled from "@emotion/styled";

const PageWrapper = styled.div`
  padding: 0 84px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 48px;
  }

  @media (max-width: 768px) {
    padding: 0 24px;
  }

  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;

export default PageWrapper;
