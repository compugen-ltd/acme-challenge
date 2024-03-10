import { Modal, Box, Typography, Divider, Button, Avatar } from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';

import { useListUsersContext } from '../../context/listUsersContext';
import formattedDate from '../../services/formattedDate';

export default function UserModal() {
    const { usersData } = useListUsersContext();
    const { id } = useParams<{ id: string }>();
    const user = usersData.find(user => user.login.uuid === id);
    const history = useHistory();

    // Render the modal only if user is defined
    if (!user) {
        return null;
    }

    const handleClose = () => {
        // Remove the id parameter from the URL and navigate back
        history.push('/');
    };

    return (
        // TODO: make responsive
        <Modal
            open
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                p: 4,
                borderRadius: 2,
                width: 600,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5em',
            }}>
                <Avatar
                    alt={user.name.first + " " + user.name.last}
                    src={user.picture.large}
                    sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h6" id="modal-title">
                    Details for ID: {id}
                </Typography>
                <Divider />
                <Typography variant="body1" id="modal-description">
                    <b>Full Name:</b> {`${user.name.first} ${user.name.last}`}
                </Typography>
                <Typography variant="body1">
                    <b>Email:</b> {user.email}
                </Typography>
                <Typography variant="body1">
                    <b>Gender:</b> {user.gender}
                </Typography>
                <Typography variant="body1">
                    <b>Date of Birth:</b> {formattedDate(user.dob.date)}
                </Typography>
                <Typography variant="body1">
                    <b>Nationality:</b> {user.nat}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
