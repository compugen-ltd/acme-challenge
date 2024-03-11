import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { useListUsersContext } from '../../context/listUsersContext';
import { SearchRounded } from '@material-ui/icons';

export default function Search() {
    const { searchQuery, setSearchQuery } = useListUsersContext();

    const handleClear = () => {
        setSearchQuery("");
    };

    return (
        <Tooltip title='Search Users'>

            <TextField
                label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchRounded />
                        </InputAdornment>
                    ),
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
        </Tooltip>

    );
}
