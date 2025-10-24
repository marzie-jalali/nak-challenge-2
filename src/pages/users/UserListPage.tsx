import UserHeading from "../../components/user/UserHeading";
import UserTable from "../../components/user/UserTable";
import { useUserStore } from "../../store/userStore";

const UserListPage = () => {
  const users = useUserStore((state) => state.users);

  return (
    <div>
      <UserHeading translationKey="user_list_heading" />
      <UserTable users={users} />
    </div>
  );
};

export default UserListPage;
