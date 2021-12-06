import * as React from 'react';
import { Container, LoadBtn, SelectStyled, InputSearch } from './styles';
import UserModal from '../UserModal';
import { useListUsersContext } from "../../context/listUsersContext";
import api from '../../services/api';
import { UsersDataProps } from '../../services/types';
import formattedDate from '../../services/formattedDate';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function StickyHeadTable() {


    const { usersData, getUsersData } = useListUsersContext()

    const [page, setPage] = React.useState<number>(1);
    const [gender, setGender] = React.useState<string>("");
    const [nationality, setNationality] = React.useState<string>("");
    const [filteredUsers, setFilteredUsers] = React.useState<UsersDataProps[]>([]);
    const [nameSearchQuery, setNameSearchQuery] = React.useState<string>("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameSearchQuery(e.target.value.toLowerCase());
    }

    const handleSelectNationality = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNationality(e.target.value);
    }

    const handleSelectGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
    }

    const handleFetch = () => {
        setPage(page + 1);
    }

    const filterUsers = () => {
        const filteredUsers = usersData.filter(user => ( 
            ( nameSearchQuery ? (user.name.first + user.name.last).toLowerCase().includes(nameSearchQuery) : true )
            &&
            ( nationality ? user.nat === nationality : true )
            && 
            ( gender ? user.gender === gender : true )
            )
        )
        setFilteredUsers(filteredUsers);
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const resultsPerPage = 25;
            const seed = "foobar";
            const response = await api.get(`?page=${page}&results=${resultsPerPage}&seed=${seed}`);
            if (response.status === 200) {
                const scientistsData: UsersDataProps[] = response.data['results'];
                getUsersData(usersData.concat(scientistsData));
                setFilteredUsers(usersData.concat(scientistsData));
            }
        }
        fetchData();
    }, [page]);

    React.useEffect(() => {
            filterUsers();
    }, [usersData, nationality, gender, nameSearchQuery]);


  return (
        <Container>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table aria-label="table">
                        <TableHead>
                        <TableRow>
                            <TableCell>
                                <label>Filter By Name </label>
                                <InputSearch type="text" placeholder="Search" name="searchName" value={nameSearchQuery} onChange={handleSearch} />
                            </TableCell>
                            <TableCell align="right">
                                <label>Filter By Nationality </label>
                                    <SelectStyled value={nationality} onChange={handleSelectNationality} name={'nationality'}>
                                        <option value=""></option>
                                        {Array.from(new Set(usersData.map((user: any) => user.nat))).map(nat =>
                                            <option value={nat} key={nat}>{nat}</option>)}
                                    </SelectStyled>
                            </TableCell>
                            <TableCell align="right">
                                <label>Filter By Gender </label> {gender}
                                    <SelectStyled value={gender} onChange={handleSelectGender} name={'gender'}>
                                        <option value=""></option>
                                        {Array.from(new Set(usersData.map((user: any) => user.gender))).map(gender =>
                                            <option value={gender} key={gender}>{gender}</option>)}
                                    </SelectStyled>
                            </TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Full name</TableCell>
                            <TableCell align="right">Nationality</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Birth Date</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            { filteredUsers.map(user => (
                                    <TableRow
                                    key={user.login.uuid}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                    <UserModal user={user} />
                                    </TableCell>
                                    <TableCell align="right">{user.nat}</TableCell>
                                    <TableCell align="right">{user.gender}</TableCell>
                                    <TableCell align="right">{formattedDate(user.dob.date)}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <LoadBtn onClick={handleFetch}>See more</LoadBtn>
            </Paper>
        </Container>
  );
}
