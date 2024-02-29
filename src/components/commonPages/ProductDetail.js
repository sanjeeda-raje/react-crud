import React, { useState, useEffect } from 'react';
import { CartState } from '../../context/Context';

import { useParams } from 'react-router-dom';
import { Box, Button, Container, Grid, IconButton, Paper, Rating, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import theme from '../../CartTheme'
import styled from '@emotion/styled';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductDetail = ({ prod }) => {
  const {
    state: { cart, products },
    dispatch,
  } = CartState();
  const { id } = useParams();


  const [product, setProduct] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const prod = products.find(p => p.id === id);
    if (prod) {
      setProduct(prod);
      setValue(prod.ratings);
    }
  }, [id, products]);

  const DetailBox = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '50%',
    '@media (max-width: 992px)': {
      width: 'auto',
    }
  }));


  if (!product) {
    return (
      <Container>
        <Typography variant="h6" fontWeight={'bold'}>Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxwidth='md' sx={theme.centeredContent}>
      <DetailBox elevation={3} >
        <Grid conatiner  sx={{ justifyContent: "center" }}>
          <Grid item xs={12} sm={6} >
            <img src={product.img} alt={product.product} width={345} />
            <Typography variant="h6" fontWeight={'bold'}>{product.productname}</Typography>
            <Typography variant="body1">{product.Desc}</Typography>
            <Typography variant="h6">Price: ${product.price}</Typography>
            <Typography variant="h6">Ratings: {product.ratings}</Typography>
            <Box>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>

            {
              cart.some((p) => p.id === product.id) ? (
                <IconButton color='error' onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: product,
                  })
                } >
                  <DeleteIcon
                    />
                </IconButton>
              ) :
                (
                  <IconButton onClick={() =>
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: product,
                    })
                  } >
                    <ShoppingCartIcon color='success' />

                  </IconButton>
                )

            }
          </Grid>
        </Grid>

      </DetailBox>
    </Container>
  );
};

export default ProductDetail;
