import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { AccountCircle, DeleteForeverOutlined, DeleteOutlineOutlined } from '@material-ui/icons';
import { Avatar, Grid, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { useListUsersContext } from '../../context/listUsersContext';
import formattedDate from '../../services/formattedDate';
import { UsersDataProps } from '../../services/types';
import { useState } from 'react';

export default function User({ user }: { user: UsersDataProps }) {
    const [deletePressed, setDeletePressed] = useState(false);
    const { setUsers } = useListUsersContext();

    const handleDeletePressed = () => {
        // Delete confirmation logic
        setDeletePressed(true)

        setTimeout(() => {
            setDeletePressed(false)
        }, 3000)

        if (deletePressed) {
            handleDelete()
        }

    };

    function handleDelete() {
        // Removes selected user from state
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
            {/* Capitalized for aesthetic purposes */}
            <TableCell align="center">{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</TableCell>
            <TableCell align="center">{formattedDate(user.dob.date)}</TableCell>
            <TableCell align="center">
                <Grid container spacing={1} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Tooltip title='View User Details'>
                            <NavLink to={user.login.uuid} style={{ color: '#007bff' }}>
                                <AccountCircle />
                            </NavLink>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        {/* Wrapped in a button to show a click curser */}
                        <Tooltip title={!deletePressed ? 'Delete User' : 'Confirm Deletion'}>
                            <button onClick={handleDeletePressed} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                {deletePressed ? <DeleteForeverOutlined /> : <DeleteOutlineOutlined />}
                            </button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </TableCell >
        </TableRow >

    );
}
