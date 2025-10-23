import React from 'react';
import styled from '@emotion/styled';

interface BadgeProps {
  status: 'active' | 'not_active' | null;
  children: React.ReactNode;
}

const CustomBadge: React.FC<BadgeProps> = ({ status, children }) => {
  return (
    <BadgeContainer status={status}>
      {children}
    </BadgeContainer>
  );
};

export default CustomBadge;

const BadgeContainer = styled.span<{ status: 'active' | 'not_active' | null }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  
  ${({ status }) => {
    switch (status) {
      case 'active':
        return `
          background-color: #EBFFF1;
          color: #0FBD66;
        `;
      case 'not_active':
        return `
          background-color: #FCEEEE;
          color: #DC362E;
        `;
      case null:
      default:
        return `
          background-color: #F1F1F1;
          color: #242424;
        `;
    }
  }}
`;