import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CircularProgress, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useListUsersContext } from '../../context/listUsersContext';
import User from '../User/User';

export default function UserList() {
    const { usersData, setPage, status, searchQuery } = useListUsersContext();

    // Filter users names and email based on searchQuery
    const filteredUsers = usersData.filter((user) => {
        const searchText = searchQuery.toLowerCase();
        return (
            user.name.first.toLowerCase().includes(searchText) ||
            user.name.last.toLowerCase().includes(searchText) ||
            user.email.toLowerCase().includes(searchText)
        )
    });

    function loadMore() {
        setPage((p: number) => p + 1);
    }

    return (
        <Paper>
            {!filteredUsers.length && status === "ready" && <Typography sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '50%' }}>No users found</Typography>}
            <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 250 }} aria-label="scientists table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Gender</TableCell>
                                <TableCell align="center">Date of birth</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <User user={user} key={user.login.uuid} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <LoadingButton
                    onClick={loadMore}
                    loading={status === "loading"}
                    sx={{
                        display: 'block',
                        margin: 'auto',
                        my: 2,
                        py: 1,
                        px: 3,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        },
                        textTransform: 'none',
                    }}
                >
                    Load more
                </LoadingButton>
            </>

            {status === "loading" && <CircularProgress sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '50%' }} />}
            {status !== "ready" && status !== "loading" && <Typography sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '50%' }}>An unexpected error occurred, please try again later.</Typography>}
        </Paper>
    );
}
