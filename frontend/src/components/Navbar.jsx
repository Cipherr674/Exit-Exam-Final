import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FeedbackIcon from '@mui/icons-material/Feedback';
import DashboardIcon from '@mui/icons-material/Dashboard';

function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      width: '100%',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <AppBar position="static" sx={{ 
        background: 'linear-gradient(135deg,rgb(27, 28, 48) 0%,rgb(47, 57, 71) 100%)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '10px',
      }}>
        <Toolbar sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
          py: { xs: 2, sm: 1 }
        }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            Feedback Admin Panel
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            width: { xs: '100%', sm: 'auto' }
          }}>
            <Button 
              color="inherit" 
              startIcon={<DashboardIcon />}
              onClick={() => navigate('/')}
              sx={{ 
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Dashboard
            </Button>
            <Button 
              color="inherit"
              startIcon={<FeedbackIcon />}
              onClick={() => navigate('/add-feedback')}
              sx={{ 
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Add Feedback
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar; 