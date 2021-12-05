import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { UsersDataProps } from '../../services/types';
import formattedDate from '../../services/formattedDate';
import { ImageContainer, Image } from './styles';

const useStyles = makeStyles({
    modal: {
        display: "flex",
        margin: "auto",
        width: 300,
        height: 350,
    },
    box: {
        backgroundColor: "white",
        padding: "10px 20px",
        width: 300,
        height: 350,
    },
    button: {
        '&:hover': {
            backgroundColor: "transparent !important"
        },
    },
    colorBlack: {
        color: "black",
    }
});


const UserModal = ({ user }: { user: UsersDataProps }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const classes = useStyles();

    return (
        <>
            <IconButton className={classes.button} disableRipple onClick={handleOpen} size="small">
                <AccountCircle className={classes.colorBlack} />
            </IconButton >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={classes.modal}
            >
                <Box className={classes.box}>
                    <ImageContainer>
                        <Image src={user.picture.large} alt="user-image" />
                    </ImageContainer>
                    <Typography id="modal-modal-title" variant="h6" component="h2" >
                        {user.name.first + " " + user.name.last}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {"Age: " + user.dob.age}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {"Date of birth: " + formattedDate(user.dob.date)}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {"Gender: " + user.gender}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {"Nationality: " + user.nat}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {"Email: " + user.email}
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default UserModal;