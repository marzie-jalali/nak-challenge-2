import React, { useState, useMemo } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomButton from "../shared/tools/CustomButton";
import CustomBadge from "../shared/tools/CustomBadges";
import PageWrapper from "../layout/user/PageWrapper";
import type { UserEntity } from "../../types/user";

interface Props {
  users: UserEntity[];
}

const ITEMS_PER_PAGE = 5;

const UserTable: React.FC<Props> = ({ users }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const handleRowClick = (id: number) => {
    navigate(`/users/${id}/edit`);
  };

  // Calculate pagination
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <PageWrapper>
      <TableContainer>
        <TopRow>
          <HeaderTitle>{t("Items")}</HeaderTitle>
          <CustomButton onClick={() => navigate("/users/new")}>
            {t("Add New Item")}
          </CustomButton>
        </TopRow>

        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <Th>{t("Item")}</Th>
                <Th>{t("Name")}</Th>
                <Th>{t("User Name")}</Th>
                <Th>{t("Email")}</Th>
                <Th>{t("Phone")}</Th>
                <Th>{t("Status")}</Th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                  <Td>{startIndex + index + 1}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.userName}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phone}</Td>
                  <Td>
                    <CustomBadge status={user.status}>
                      {user.status === "active"
                        ? t("active")
                        : user.status === "not_active"
                        ? t("inactive")
                        : t("unknown")}
                    </CustomBadge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>

        {totalPages > 1 && (
          <PaginationContainer>
            <PaginationInfo>
              Showing {startIndex + 1} to {Math.min(endIndex, users.length)} of{" "}
              {users.length} items
            </PaginationInfo>
            <PaginationControls>
              <PaginationButton
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </PaginationButton>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationButton
                    key={page}
                    onClick={() => handlePageChange(page)}
                    active={currentPage === page}
                  >
                    {page}
                  </PaginationButton>
                )
              )}

              <PaginationButton
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </PaginationButton>
            </PaginationControls>
          </PaginationContainer>
        )}
      </TableContainer>
    </PageWrapper>
  );
};

export default UserTable;

const TableContainer = styled.div`
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #242424;
  margin: 0;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;

  th,
  td {
    white-space: nowrap;
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 14px 16px;
  font-weight: 600;
  font-size: 12px;
  color: #242424;
  background: #fafafa;
  border-bottom: 1px solid #e6e6e6;
`;

const Td = styled.td`
  padding: 19px 24px;
  font-size: 12px;
  font-weight: 400;
  color: #242424;
  border-top: 1px solid #e6e6e6;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  padding: 16px 24px;
  background: #ffffff;
  border-top: 1px solid #e6e6e6;
`;

const PaginationInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PaginationButton = styled.button<{
  active?: boolean;
  disabled?: boolean;
}>`
  padding: 8px 12px;
  border: 1px solid #e6e6e6;
  background: ${({ active }) => (active ? "#242424" : "#ffffff")};
  color: ${({ active }) => (active ? "#ffffff" : "#242424")};
  border-radius: 6px;
  font-size: 14px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background: ${({ active }) => (active ? "#242424" : "#f5f5f5")};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
