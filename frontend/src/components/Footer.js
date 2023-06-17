import React from 'react';
import { Container, Typography } from '@mui/material';

const footerStyle = {
  backgroundColor: '#f5f5f5',
  padding: '20px 0',
  marginTop: 'auto',
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

function Footer() {
  return (
    <div style={containerStyle}>
      <Container component='footer' style={footerStyle}>
        <Typography variant='body2' align='center' color='textSecondary'>
          &copy; Adeem 2023. All rights reserved.
        </Typography>
      </Container>
    </div>
  );
}

export default Footer;
