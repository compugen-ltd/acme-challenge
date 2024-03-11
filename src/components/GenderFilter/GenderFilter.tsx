import { FemaleRounded, MaleRounded } from '@mui/icons-material'
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'

import { useListUsersContext } from '../../context/listUsersContext'
import { Gender } from '../../services/types';

export default function GenderFilter() {
    const { genderFilter, setGenderFilter, setPage } = useListUsersContext();

    const handleFilter = (
        event: React.MouseEvent<HTMLElement>,
        newFilter: Gender,
    ) => {
        // Resets pagination because api returns random unpaginated users
        setPage(p => 0);
        setGenderFilter(newFilter);
    }

    return (
        <ToggleButtonGroup
            aria-label='gender filtering'
            color="primary"
            exclusive
            value={genderFilter}
            onChange={handleFilter}
            sx={{ height: '3.5em' }}
        >
            <Tooltip title="Male">
                <ToggleButton value="male" aria-label="male">
                    <MaleRounded />
                </ToggleButton>
            </Tooltip>
            <Tooltip title="Female">
                <ToggleButton value="female" aria-label="female">
                    <FemaleRounded />
                </ToggleButton>
            </Tooltip>
        </ToggleButtonGroup>
    )
}
