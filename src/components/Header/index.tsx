import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import BiotechIcon from '@mui/icons-material/Biotech';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row" spacing={2}>
      </Stack>
      <AppBar position="static">
        <Toolbar>
          <BiotechIcon fontSize="large" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Acme Corp</Typography>
          <div>
            <IconButton size="large" >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}