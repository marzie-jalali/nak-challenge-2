import styled from "@emotion/styled";

interface DividerProps {
  margin?: string;
  color?: string;
  thickness?: string;
}

const Divider: React.FC<DividerProps> = ({
  margin = "24px 0",
  color = "#e0e0e0",
  thickness = "1px",
}) => {
  return <DividerWrapper margin={margin} color={color} thickness={thickness} />;
};

export default Divider;

const DividerWrapper = styled.div<{
  margin: string;
  color: string;
  thickness: string;
}>`
  width: 100%;
  margin: ${({ margin }) => margin};
  border-top: ${({ thickness }) => thickness} solid ${({ color }) => color};
`;
