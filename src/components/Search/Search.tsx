import { IconButton, InputAdornment, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { useListUsersContext } from '../../context/listUsersContext';

export default function Search() {
    const { searchQuery, setSearchQuery } = useListUsersContext();

    const handleClear = () => {
        setSearchQuery("");
    };

    return (

        <TextField
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {searchQuery.length > 0 && (
                            <IconButton onClick={handleClear} size="small" sx={{ p: 2 }}>
                                <ClearIcon />
                            </IconButton>
                        )}
                    </InputAdornment>
                ),
            }}
        />

    );
}
