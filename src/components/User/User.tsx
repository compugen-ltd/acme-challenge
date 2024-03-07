import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { UsersDataProps } from '../../services/types';
import formattedDate from '../../services/formattedDate';
import { useListUsersContext } from '../../context/listUsersContext';
import { Button, IconButton } from '@mui/material';
import { AccountCircle } from '@material-ui/icons';

export default function User({ user }: { user: UsersDataProps }) {
    const { setSelectedUser } = useListUsersContext()

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {`${user.name.first} ${user.name.last}`}
            </TableCell>
            <TableCell align="right">{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</TableCell>
            <TableCell align="right">{formattedDate(user.dob.date)}</TableCell>
            <TableCell align="right"><IconButton onClick={() => { setSelectedUser(user.login.uuid) }}><AccountCircle /></IconButton> </TableCell>
        </TableRow>
    );
}