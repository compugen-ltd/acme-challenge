import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { NavLink } from 'react-router-dom';
import { useListUsersContext } from '../../context/listUsersContext';
import formattedDate from '../../services/formattedDate';
import { AccountCircle, Delete } from '@material-ui/icons';
import { UsersDataProps } from '../../services/types';
import { Avatar } from '@mui/material';

export default function User({ user }: { user: UsersDataProps }) {
    const { setUsers } = useListUsersContext();

    function handleDelete() {
        // setUsers(users => users.filter(u => u.login.uuid !== user.login.uuid));
    }

    return (
        <TableRow>
            <TableCell align='left'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={user.picture.large} alt='user-avatar' sx={{ marginRight: '0.5rem' }} />
                    <div>{`${user.name.first} ${user.name.last}`}</div>
                </div>
            </TableCell>
            <TableCell align="center">{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</TableCell>
            <TableCell align="center">{formattedDate(user.dob.date)}</TableCell>
            <TableCell align="center">
                <Delete onClick={handleDelete} style={{ marginRight: '0.5rem' }} />
                <NavLink to={user.login.uuid}>
                    <AccountCircle />
                </NavLink>
            </TableCell>
        </TableRow>
    );
}
