import React from 'react'
import { CartState } from '../../context/Context'
import { Box, Container, Grid, Typography } from '@mui/material'
import SingleProduct from '../commonPages/SingleProduct'
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'theme.palette.text.secondary',
}));

const Home = () => {
  const {
    state: { products },
    productState: { searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;


    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.productname.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };
  return (
    <Container maxWidth='lg' component='main' sx={{ p: 3 }}>
      <Box>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          <Grid item xs={12} sm={9} >
            <Typography variant='h1' component='h1' sx={{ mb: 4, textAlign: "center" }}>Product list</Typography>
          </Grid>
        </Grid>
        <Box sx={{ flexGrow: 1 }}>

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {transformProducts().map((prod) => (
              <Grid item xs={12} sm={4} md={3} key={prod.id}>
                <Item>
                  <SingleProduct key={prod.id} prod={prod} />
                </Item>
              </Grid>
            ))}
          </Grid>

        </Box>

      </Box>
    </Container>
  )
}

export default Home
