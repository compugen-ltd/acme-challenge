import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { UsersDataProps } from '../../services/types';
import formattedDate from '../../services/formattedDate';
import { AccountCircle } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

export default function User({ user }: { user: UsersDataProps }) {

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {`${user.name.first} ${user.name.last}`}
            </TableCell>
            <TableCell align="right">{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</TableCell>
            <TableCell align="right">{formattedDate(user.dob.date)}</TableCell>
            <TableCell align="right"><NavLink to={user.login.uuid}><AccountCircle /></NavLink> </TableCell>
        </TableRow>
    );
}
