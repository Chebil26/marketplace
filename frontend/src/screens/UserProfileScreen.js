import React from 'react';
import { Avatar, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#f7f7f7',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  textAlign: 'center',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    cursor: 'pointer',
  },
}));

const UserProfileScreen = () => {
  const user = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    bio: 'Frontend Developer',
    location: 'New York',
    avatar: '/path/to/avatar.jpg',
  };

  return (
    <Grid
      container
      justifyContent='flex-start'
      alignItems='flex-start'
      minHeight='100vh'>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <StyledBox>
          <Avatar
            alt={user.name}
            src={user.avatar}
            sx={{ width: 150, height: 150, mb: 3 }}
          />
          <Typography variant='h3' component='h1' gutterBottom>
            {user.name}
          </Typography>
          <Typography variant='h5' gutterBottom color='primary'>
            @{user.username}
          </Typography>
          <Typography variant='body1' gutterBottom>
            {user.bio}
          </Typography>
          <Typography variant='body2' color='textSecondary' gutterBottom>
            Location: {user.location}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            Email: {user.email}
          </Typography>
        </StyledBox>
      </Grid>
    </Grid>
  );
};

export default UserProfileScreen;
