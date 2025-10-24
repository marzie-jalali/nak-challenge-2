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

const UserTable: React.FC<Props> = ({ users }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRowClick = (id: number) => {
    navigate(`/users/${id}/edit`);
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

        <Table>
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
            {users.map((user, index) => (
              <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                <Td>{index + 1}</Td>
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
        </Table>
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
`;

const HeaderTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #242424;
  margin: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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
