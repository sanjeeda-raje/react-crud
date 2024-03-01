import { CartState } from '../../context/Context'
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardContent, CardMedia, Typography, Rating, Box, IconButton } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';

const SingleProduct = ({ prod }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(prod.ratings);
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const handleUpdateProduct = () => {
    navigate(`/createProduct/${prod.id}`)
  }

  const handleDeleteProduct = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: 'DELETE_PRODUCT',
          payload: prod.id,
        });

        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      }
    });
  };
  return (
    <Card sx={{ cursor: 'pointer', maxWidth: 345, p: 0, height: 'auto' }}>
      <Link to={`/productdetail/${prod.id}`}>
        <CardMedia sx={{ height: 140 }} image={prod.img} title="Product Image" />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="body" component="div">
          Name: {prod.productname}
        </Typography>
        <Typography>Price : ${prod.price}</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <Box>
        <IconButton onClick={handleUpdateProduct}>
          <EditIcon />
        </IconButton>
        </Box>
        
        <Box spacing={2} direction="column" sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link onClick={
              handleDeleteProduct
            }>Delete product</Link>
            <Link to={`/productdetail/${prod.id}`} sx={{ textDecoration: 'underline' }}>Explore detail</Link>
          </Box>

        </Box>
      </CardContent>
    </Card>
  );
};

export default SingleProduct;
