import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { NavLink } from 'react-router-dom';
import { useListUsersContext } from '../../context/listUsersContext';
import formattedDate from '../../services/formattedDate';
import { AccountCircle, Delete } from '@material-ui/icons';
import { UsersDataProps } from '../../services/types';

export default function User({ user }: { user: UsersDataProps }) {
    const { setUsers } = useListUsersContext();

    function handleDelete() {
        // setUsers(users => users.filter(u => u.login.uuid !== user.login.uuid));
    }

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
                {`${user.name.first} ${user.name.last}`}
            </TableCell>
            <TableCell align="right">{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</TableCell>
            <TableCell align="right">{formattedDate(user.dob.date)}</TableCell>
            <TableCell align="right" sx={{ display: "flex", gap: "2em" }}>
                <Delete onClick={handleDelete} />
                <NavLink to={user.login.uuid}>
                    <AccountCircle />
                </NavLink>
            </TableCell>
        </TableRow>
    );
}
