import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { AccountCircle, DeleteOutlineOutlined } from '@material-ui/icons';
import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { useListUsersContext } from '../../context/listUsersContext';
import formattedDate from '../../services/formattedDate';
import { UsersDataProps } from '../../services/types';

export default function User({ user }: { user: UsersDataProps }) {
    const { setUsers } = useListUsersContext();

    function handleDelete() {
        setUsers(prevUsers => prevUsers.filter(u => u.login.uuid !== user.login.uuid));
    }

    return (
        <TableRow>
            <TableCell align='left'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={user.picture.large} alt='user-avatar' sx={{ marginRight: '0.5rem' }} />
                    <div style={{ marginLeft: '0.5rem' }}>
                        <b>{`${user.name.first} ${user.name.last}`}</b>
                    </div>
                </div>
            </TableCell>
            <TableCell align="center">{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</TableCell>
            <TableCell align="center">{formattedDate(user.dob.date)}</TableCell>
            <TableCell align="center">
                <button onClick={handleDelete} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem' }}>
                    <DeleteOutlineOutlined />
                </button>
                <NavLink to={user.login.uuid}>
                    <AccountCircle />
                </NavLink>
            </TableCell>
        </TableRow>

    );
}
