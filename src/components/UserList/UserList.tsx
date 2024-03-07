import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, TablePagination } from '@mui/material';

import { useListUsersContext } from '../../context/listUsersContext'
import User from '../User/User';
import { DEFAULT_USERS_PER_PAGE } from '../../App';

export default function UserList() {
    const { usersData, setPage, page, status, setStatus } = useListUsersContext()
    console.log(usersData)

    function handleChangePage(event: unknown, newPage: number) {
        setPage(newPage);
        setStatus("loading");
    }
    return (
        <Paper >
            <TableContainer component={Paper} sx={{ position: 'relative' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Date of birth</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersData && usersData.map((user) => <User user={user} key={user.login.uuid} />)}
                    </TableBody>
                </Table>
            </TableContainer >
            <TablePagination
                component="div"
                rowsPerPage={DEFAULT_USERS_PER_PAGE}
                count={-1}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
                showFirstButton
            />

            {status === "loading" && <CircularProgress sx={{ position: 'absolute', bottom: '100px' }} />}
        </Paper>

    );
}