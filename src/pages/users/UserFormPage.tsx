
import { useParams } from 'react-router-dom';
import UserForm from '../../components/user/UserForm'
import UserHeading from '../../components/user/UserHeading'

const UserFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  return (
    <div>
      {isEditMode ? <UserHeading translationKey="edit_user_heading" /> : <UserHeading translationKey="add_user_heading" />}
      <UserForm />
    </div>
    
  )
}

export default UserFormPage