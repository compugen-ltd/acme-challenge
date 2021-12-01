import * as React from 'react';
import { Container, Table, TableHeader, TableData, FullWidthInput, TableRow, SeeMoreBtn, TableContainer, NameInput, SelectStyled, NationalityContainer, GenderButton, GenderButtonContainer, GenderNationalityContainer, FilterOptionsContainer } from './styles';
import UserModal from '../UserModal';
import { useListUsersContext } from "../../context/listUsersContext";
import api from '../../services/api';
import { UsersDataProps } from '../../services/types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { makeStyles } from "@material-ui/core/styles";
import formattedDate from '../../services/formattedDate';

const useStyles = makeStyles({
    root: {
        color: "black !important",
        marginRight: 10,
    },
    box: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
    }
});

const UserList = () => {

    const classes = useStyles();

    const { usersData, getUsersData } = useListUsersContext()

    type GenderProps = {
        female: boolean;
        male: boolean;
    }

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);
    const [nationalities, setNationalities] = React.useState<string[]>([]);
    const [nationality, setNationality] = React.useState<string>("");
    const [isEndOfResults, setIsEndOfResults] = React.useState<boolean>(false);
    const [filteredUsers, setFilteredUsers] = React.useState<UsersDataProps[]>([]);
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [nameSearchQuery, setNameSearchQuery] = React.useState<string>("");
    const [isGenderSelected, setIsGenderSelected] = React.useState<GenderProps>({ female: false, male: false });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsGenderSelected({ female: false, male: false });
        setNationality("");
        if (e.target.name === "searchUser") {
            setSearchQuery(e.target.value);
            setNameSearchQuery("");
            const query = (e.target.value).toLowerCase();
            const relevantUsers = usersData.filter(user => ((user.name.first).toLowerCase().includes(query) || (user.name.last).toLowerCase().includes(query) || user.gender.includes(query) || formattedDate(user.dob.date).includes(query))
            )
            setFilteredUsers(relevantUsers);
        }
        if (e.target.name === "searchName" && /\d/.test(e.target.value) === false) {
            setNameSearchQuery(e.target.value);
            setSearchQuery("");
            const query = (e.target.value).toLowerCase();
            const relevantUsers = usersData.filter(user => ((user.name.first).toLowerCase().includes(query) || (user.name.last).toLowerCase().includes(query))
            )
            setFilteredUsers(relevantUsers);
        }
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchQuery("");
        setNameSearchQuery("");
        setIsGenderSelected({ female: false, male: false });
        const selectedNationality = e.target.value;
        setNationality(selectedNationality);
        const relevantUsers = usersData.filter(user => (user.nat === selectedNationality)
        )
        setFilteredUsers(relevantUsers);
    }

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.id === "fetchMoreData") {
            setIsLoading(true);
            setPage(page + 1);
        }
        if (e.currentTarget.id === "gender") {
            const genderSelected = e.currentTarget.getAttribute('value');
            if (genderSelected === "female") {
                setIsGenderSelected({ female: true, male: false });
                const relevantUsers = usersData.filter(user => user.gender === "female");
                setFilteredUsers(relevantUsers);
            }
            if (genderSelected === "male") {
                setIsGenderSelected({ female: false, male: true });
                const relevantUsers = usersData.filter(user => user.gender === "male");
                setFilteredUsers(relevantUsers);
            }
            setSearchQuery("");
            setNameSearchQuery("");
            setNationality("");
        }
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
                const responseNationalities: string[] = [];
                scientistsData.map(user => responseNationalities.push(user.nat));
                const allNationalities: string[] = nationalities.concat(responseNationalities);
                const nationalityOptions: string[] = allNationalities.filter((item, index) => allNationalities.indexOf(item) === index);
                setNationalities(nationalityOptions);
                if (scientistsData.length < 25) {
                    setIsEndOfResults(true);
                }
            }
            setIsLoading(false);
        }
        fetchData();
    }, [page]);


    return (
        <Container>
            <FullWidthInput type="text" placeholder="Search user" name="searchUser" value={searchQuery} onChange={handleChange} />
            <FilterOptionsContainer>
                <NameInput type="text" placeholder="Search names" name="searchName" value={nameSearchQuery} onChange={handleChange} />
                <GenderNationalityContainer>
                    <GenderButtonContainer>
                        <GenderButton className={`${isGenderSelected.female}` === "true" ? "genderButtonSelected" : ""} type="button" onClick={handleClick} value={"female"} id="gender">Female</GenderButton>
                        <GenderButton className={`${isGenderSelected.male}` === "true" ? "genderButtonSelected" : ""} type="button" onClick={handleClick} value={"male"} id="gender">Male</GenderButton>
                    </GenderButtonContainer>
                    <NationalityContainer >
                        <label>Nationality</label>
                        <SelectStyled onChange={handleSelectChange}>
                            <option value="" hidden></option>
                            {nationalities.map(nat =>
                                <option value={nat} key={nat}>{nat}</option>)}
                        </SelectStyled>
                    </NationalityContainer>
                </GenderNationalityContainer>
            </FilterOptionsContainer>
            <TableContainer>
                <Table>
                    <tbody>
                        <tr>
                            <TableHeader>Full name</TableHeader>
                            <TableHeader>Gender</TableHeader>
                            <TableHeader>Birth</TableHeader>
                            <TableHeader>Actions</TableHeader>
                        </tr>
                        {filteredUsers.map(user =>
                            <TableRow key={user.login.uuid}>
                                <TableData>{user.name.first + " " + user.name.last}</TableData>
                                <TableData>{user.gender}</TableData>
                                <TableData>{formattedDate(user.dob.date)}</TableData>
                                <TableData>
                                    <UserModal user={user} />
                                </TableData>
                            </TableRow>
                        )}
                    </tbody>
                </Table>
            </TableContainer>
            {isLoading === false && isEndOfResults === false && <SeeMoreBtn id="fetchMoreData" onClick={handleClick}>See more</SeeMoreBtn>}
            {isLoading === true && <Box sx={{ display: 'flex' }} className={classes.box} >
                <CircularProgress size={20} className={classes.root} />
                Loading...
            </Box>}
        </Container>
    )
}

export default UserList;