import { FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

import { useListUsersContext } from '../../context/listUsersContext';
import { Nationality } from '../../services/types';

const nationalities: Nationality[] = ["AU", "BR", "CA", "CH", "DE", "DK", "ES", "FI", "FR", "GB", "IE", "IN", "IR", "MX", "NL", "NO", "NZ", "RS", "TR", "UA", "US"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function NationalityFilter() {
    const { nationalityFilter, setNationalityFilter, setPage } = useListUsersContext();

    const handleChange = (event: SelectChangeEvent<typeof nationalityFilter>) => {
        // Resetting pagination because api returns random unpaginated users
        setPage(p => 0);
        setNationalityFilter(event.target.value as Nationality[]);
    };

    const renderValue = (selected: Nationality[]) => {
        // Check if no nationalities are selected
        if (selected.length === 0) {
            return 'All';
        }
        // Otherwise, return comma-separated list
        return selected.join(', ');
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 125 }}>
            <InputLabel id="nationality-label">Nationality</InputLabel>
            <Select
                labelId="nationality-label"
                id="multiple-select"
                multiple
                value={nationalityFilter}
                onChange={handleChange}
                inputProps={{
                    name: 'nationality',
                }}
                input={<OutlinedInput label="Nationality" />}
                renderValue={renderValue}
                MenuProps={MenuProps}
            >
                {nationalities.map((n) => (
                    <MenuItem key={n.toString()} value={n}>
                        <Checkbox checked={nationalityFilter.includes(n)} />
                        <ListItemText primary={n} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
