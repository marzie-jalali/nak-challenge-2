import styled from "@emotion/styled";
import notFoundImage from "../assets/images/notFound.png";

const NotFoundPage = () => {
  return (
    <>
      <NotFoundContainer>
        <img src={notFoundImage} alt="Not Found" />
      </NotFoundContainer>
    </>
  );
};

export default NotFoundPage;

const NotFoundContainer = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
