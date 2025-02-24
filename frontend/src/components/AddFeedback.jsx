import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Container, Paper } from '@mui/material';
import './AddFeedback.css';

function AddFeedback() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({
    courseId: '',
    courseName: '',
    courseDuration: '',
    feedbackRating: '',
    feedbackComments: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/feedback', feedback);
      navigate('/');
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 3, md: 4 }, 
          mt: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
          backgroundColor: 'white',
          border: '1px solid #0e2c44'
        }}
      >
        <h2 style={{ color: '#0d1036', textAlign: 'center', marginBottom: '2rem' }}>
          Add New Feedback
        </h2>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5
          }}
        >
          <TextField
            fullWidth
            label="Course ID"
            variant="outlined"
            value={feedback.courseId}
            onChange={(e) => setFeedback({...feedback, courseId: e.target.value})}
            required
          />
          
          <TextField
            fullWidth
            label="Course Name"
            variant="outlined"
            value={feedback.courseName}
            onChange={(e) => setFeedback({...feedback, courseName: e.target.value})}
            required
          />
          
          <TextField
            fullWidth
            label="Course Duration"
            variant="outlined"
            value={feedback.courseDuration}
            onChange={(e) => setFeedback({...feedback, courseDuration: e.target.value})}
            required
          />
          
          <TextField
            fullWidth
            label="Rating (1-5)"
            variant="outlined"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 5 } }}
            value={feedback.feedbackRating}
            onChange={(e) => setFeedback({
              ...feedback, 
              feedbackRating: Math.min(5, Math.max(1, Number(e.target.value) || 1))
            })}
            required
          />
          
          <TextField
            fullWidth
            label="Comments"
            variant="outlined"
            multiline
            rows={4}
            value={feedback.feedbackComments}
            onChange={(e) => setFeedback({...feedback, feedbackComments: e.target.value})}
            required
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              py: 1.5,
              backgroundColor: '#0e2c44',
              '&:hover': {
                backgroundColor: '#0d1036',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(13, 16, 54, 0.3)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Submit Feedback
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddFeedback; 