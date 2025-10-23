import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled'

interface PageHeadingProps {
    translationKey: string;
  }

const UserHeading :React.FC<PageHeadingProps> = ({ translationKey }) => {
  const { t } = useTranslation();
  const fullText = t(translationKey);
  const [firstWord, ...rest] = fullText.split(' ');

  return (
    <Heading>  <FirstWord>{firstWord}</FirstWord> {rest.join(' ')}</Heading>
  )
}

export default UserHeading


const Heading = styled.h1`
  text-align: center;
  font-weight: normal;
  padding: 48px 0;

`;

const FirstWord = styled.span`
  font-weight: bold; 
`;
