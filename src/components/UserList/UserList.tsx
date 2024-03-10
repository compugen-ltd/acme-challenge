import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CircularProgress, TablePagination, Typography } from '@mui/material';

import { useListUsersContext } from '../../context/listUsersContext';
import User from '../User/User';
import { DEFAULT_USERS_PER_PAGE } from '../../App';

export default function UserList() {
    const { usersData, setPage, page, status, searchQuery } = useListUsersContext();

    // Filter users based on searchQuery
    const filteredUsers = usersData.filter((user) => {
        const searchText = searchQuery.toLowerCase();
        return (
            user.name.first.toLowerCase().includes(searchText) ||
            user.name.last.toLowerCase().includes(searchText) ||
            user.email.toLowerCase().includes(searchText)
        )
    });

    function handleChangePage(event: unknown, newPage: number) {
        setPage(newPage);
    }

    return (
        <Paper>
            {!filteredUsers.length && status === "ready" && <Typography sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '50%' }}>No users found</Typography>}
            {status === "ready" && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 250 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Gender</TableCell>
                                <TableCell align="right">Date of birth</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <User user={user} key={user.login.uuid} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {status === "loading" && <CircularProgress sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '50%' }} />}
            {status !== "ready" && status !== "loading" && <Typography sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '50%' }}>An unexpected error occurred.</Typography>}
            {!searchQuery && (
                <TablePagination
                    component="div"
                    rowsPerPage={DEFAULT_USERS_PER_PAGE}
                    count={-1}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[]}
                    showFirstButton
                />
            )}
        </Paper>
    );
}
