import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  makeStyles,
  Collapse,
} from '@mui/material';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  categoryButton: {
    marginRight: '10px',
    textDecoration: 'none',
    cursor: 'pointer',
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      margin: '0 5px 10px 5px',
    },
  },
  separator: {
    margin: '0 5px',
    borderLeft: '1px solid black',
    height: '14px',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

function CategoriesHeader({ categories, filterHandler, clearHandler }) {
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <header>
      <AppBar position='static' color='default'>
        <Toolbar>
          <Container maxWidth='lg'>
            <Box className={classes.toolbar}>
              {categories.map((category, index) => (
                <React.Fragment key={category}>
                  {index !== 0 && <span className={classes.separator}></span>}
                  <Collapse in={!collapsed} timeout='auto' unmountOnExit>
                    <Button
                      variant='text'
                      color='inherit'
                      className={classes.categoryButton}
                      onClick={() => filterHandler(category)}>
                      {category}
                    </Button>
                  </Collapse>
                </React.Fragment>
              ))}
              {categories.length > 1 && (
                <Button variant='text' color='inherit' onClick={toggleCollapse}>
                  {collapsed ? 'Expand' : 'Collapse'}
                </Button>
              )}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default CategoriesHeader;
