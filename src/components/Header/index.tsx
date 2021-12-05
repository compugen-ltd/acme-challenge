import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import BiotechIcon from '@mui/icons-material/Biotech';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  header: {
    backgroundColor: 'white !important',
    boxShadow: 'none !important',
    borderBottom: '2px solid dimgray',
    height: "50px"
  },
  toolbar: {
    minHeight: "50px !important",
  },
  grayColor: {
    color: 'dimgray',
  }
});

export default function Header() {

  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <BiotechIcon fontSize="large" className={classes.grayColor} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={classes.grayColor}>Acme Corp</Typography>
          <div>
            <IconButton size="large">
              <AccountCircle className={classes.grayColor} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}