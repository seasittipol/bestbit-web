import Button from '../../../layouts/Button';
import useAdmin from '../hook/use-admin';

export default function UserForm() {
    const { user, isEdit, editedUserData, setEditedUserData, handleEditUser, handleSaveUser, handleDeleteUser } = useAdmin();
    return (
        <div className='flex flex-col gap-4'>
            <div className='text-xl font-semibold'>User Details</div>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='w-8'>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th className='w-24'>Created At</th>
                        <th className='w-24'>Updated At</th>
                        <th className='w-28'>Edit</th>
                        <th className='w-28'>Delete At</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((el, index) =>
                        isEdit && editedUserData.id === el.id
                            ? <tr key={index} className='text-center'>
                                <td>{el.id}</td>
                                <td><input value={editedUserData.name} onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })} /></td>
                                <td><input value={editedUserData.email} onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })} /></td>
                                <td><input value={editedUserData.mobile} onChange={(e) => setEditedUserData({ ...editedUserData, mobile: e.target.value })} /></td>
                                <td>{el.createdAt.split('T')[0]}</td>
                                <td>{el.updatedAt.split('T')[0]}</td>
                                <td>
                                    <Button name='Save' onClick={() => handleSaveUser(el.id)} />
                                </td>
                                <td><Button name='Delete' onClick={() => handleDeleteUser(el.id)} /></td>
                            </tr>
                            : <tr key={index} className='text-center'>
                                <td>{el.id}</td>
                                <td>{el.name}</td>
                                <td>{el.email}</td>
                                <td>{el.mobile}</td>
                                <td>{el.createdAt.split('T')[0]}</td>
                                <td>{el.updatedAt.split('T')[0]}</td>
                                <td>
                                    <Button name='Edit' onClick={() => handleEditUser(el.id)} />
                                </td>
                                <td><Button name='Delete' onClick={() => handleDeleteUser(el.id)} /></td>
                            </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
