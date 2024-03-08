import { FemaleRounded, MaleRounded } from '@mui/icons-material'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useListUsersContext } from '../../context/listUsersContext'
import { Sex } from '../../services/types';

export default function GenderFilter() {
    const { sexFilter, setSexFilter } = useListUsersContext();

    const handleFilter = (
        event: React.MouseEvent<HTMLElement>,
        newFilter: Sex[],
    ) => {
        setSexFilter(newFilter)
    }

    return (
        <ToggleButtonGroup
            aria-label='sex filtering'
            value={sexFilter}
            onChange={handleFilter}
        >
            <ToggleButton value="male" aria-label='male'>
                <MaleRounded />
            </ToggleButton>
            <ToggleButton value="female" aria-label='female'>
                <FemaleRounded />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}
