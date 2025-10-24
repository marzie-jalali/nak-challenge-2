/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <NavbarContainer>
      <StyledLink to="/users" active={location.pathname.startsWith("/users")}>
        <NavItem>List item</NavItem>
      </StyledLink>
      <StyledLink to="/fibonacci" active={location.pathname === "/fibonacci"}>
        <NavItem>Fibonacci</NavItem>
      </StyledLink>
      <StyledLink to="/collatz" active={location.pathname === "/collatz"}>
        <NavItem> Collatz Conjecture</NavItem>
      </StyledLink>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  border-bottom: 1px solid #ababab;
  gap: 24px;
`;

const NavItem = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 128px;
`;

const StyledLink = styled(Link)<{ active: boolean }>`
  color: ${({ active }) => (active ? "#242424" : "#808080")};
  text-decoration: none;
  border-bottom: ${({ active }) => (active ? "2px solid #3B3B3B" : "none")};
  font-weight: ${({ active }) => (active ? "600" : "400")};
  padding: 8px 0;
`;
