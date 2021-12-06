import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { UsersDataProps } from '../../services/types';
import formattedDate from '../../services/formattedDate';
import { ImageContainer, Image } from './styles';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const UserModal = ({ user }: { user: UsersDataProps }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen}>{user.name.first + " " + user.name.last}</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
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
                </Fade>
            </Modal>
        </>
    )
}

export default UserModal;