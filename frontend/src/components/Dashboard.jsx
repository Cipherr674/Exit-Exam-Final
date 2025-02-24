import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { TextField, Button, Box } from '@mui/material';

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`);
      fetchFeedbacks();
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const handleUpdate = async (feedback) => {
    try {
      await axios.put(`http://localhost:5000/api/feedback/${feedback._id}`, feedback);
      setEditingFeedback(null);
      fetchFeedbacks();
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2 style={{color:'#0d1036'}}>Dashboard</h2>
      <div className="feedback-list">
        {feedbacks.map((feedback) => (
          <div key={feedback._id} className="feedback-card">
            {editingFeedback?._id === feedback._id ? (
              <div className="edit-form">
                <TextField
                  fullWidth
                  label="Course Name"
                  variant="outlined"
                  value={editingFeedback.courseName}
                  onChange={(e) => setEditingFeedback({
                    ...editingFeedback,
                    courseName: e.target.value
                  })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Course ID"
                  variant="outlined"
                  value={editingFeedback.courseId}
                  onChange={(e) => setEditingFeedback({
                    ...editingFeedback,
                    courseId: e.target.value
                  })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Course Duration"
                  variant="outlined"
                  value={editingFeedback.courseDuration}
                  onChange={(e) => setEditingFeedback({
                    ...editingFeedback,
                    courseDuration: e.target.value
                  })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Rating (1-5)"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: 5 } }}
                  value={editingFeedback.feedbackRating}
                  onChange={(e) => setEditingFeedback({
                    ...editingFeedback,
                    feedbackRating: Math.min(5, Math.max(1, Number(e.target.value) || 1))
                  })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Comments"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={editingFeedback.feedbackComments}
                  onChange={(e) => setEditingFeedback({
                    ...editingFeedback,
                    feedbackComments: e.target.value
                  })}
                  margin="normal"
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => handleUpdate(editingFeedback)}
                    fullWidth
                    style={{backgroundColor:'#0d1036'}}
                  >
                    Save
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={() => setEditingFeedback(null)}
                    fullWidth
                    style={{backgroundColor:'#0d1036', color:'white', borderColor:'white'}}
                  >
                    Cancel
                  </Button>
                </Box>
              </div>
            ) : (
              <>
                <h3>{feedback.courseName}</h3>
                <p>Course ID: {feedback.courseId}</p>
                <p>Duration: {feedback.courseDuration}</p>
                <p>Rating: {feedback.feedbackRating}/5</p>
                <p>Comments: {feedback.feedbackComments}</p>
                <div className="actions">
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => setEditingFeedback(feedback)}
                    fullWidth
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error"
                    onClick={() => handleDelete(feedback._id)}
                    fullWidth
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard; 