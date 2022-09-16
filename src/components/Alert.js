import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react'
import { useAuth } from '../Context/AuthContext'

const Alert = () => {
    const {alert,setAlert} = useAuth();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    setAlert({open:false});
    }

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert elevation={10} onClose={handleClose} severity={alert.type} variant="filled">
            {alert.message}
        </MuiAlert>
    </Snackbar>
  )
}

export default Alert;