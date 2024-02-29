import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartState } from '../../context/Context';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import theme from '../../CartTheme';
import styled from '@emotion/styled';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const schema = yup.object().shape({
  firstName: yup.string().required().min(4, 'at least 4').max(15, 'no more than 15'),
  productPrice: yup
    .string()
    .required()
    .matches(/^[\d+\-]+$/, ' only numbers,+ and -')
    .min(2, 'please enter valid mobile number')
    .max(5, 'please enter valid mobile number'),
  chooseCb: yup.bool().oneOf([true], 'Checkbox selection is required'),
  food: yup.string().required('Please select one option.'),
  prodimage: yup
    .mixed()
    .required('An image is required')
    .test('fileSize', 'The file is too large', (value) => {
      return value && value[0] && value[0].size <= 1024 * 1024; 
    })
    .test('fileType', 'Unsupported file format', (value) => {
      return value && value[0] && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
    }),
});

const CreateProduct = () => {
  const navigate = useNavigate();
  const { state, dispatch } = CartState();

  const LabelForm = styled(InputLabel)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: '700',
  }));

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('data', data);
    if (Object.keys(errors).length === 0) {
     
      console.log('no error');
      dispatch({
        type: 'ADD_PRODUCT',
        payload: {
          id: state.products.length + 1, 
          price: data.productPrice,
                    product: data.firstName,
          img: data.img, 
          productname: data.firstName,
          Desc: '', 
          ratings: 0, 
        },
      });
      navigate('/');
    }
  };

  return (
    <Container maxWidth="lg" component="main" sx={{ ...theme.centeredContent }}>
      <Box
        component="form"
        autoComplete="off"
        sx={{ px: 2 }}
        id="hookForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid spacing={2} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h4" component="h6" sx={{ mb: 4, fontWeight: '700' }}>
              Create a Product
            </Typography>

            <Box>
              <LabelForm>Product Name</LabelForm>
              <TextField
                id="name"
                type="text"
                label="Name a product"
                variant="outlined"
                sx={{ ...theme.formInputFields, my: 1.5 }}
                {...register('firstName')}
              />
              <Typography sx={{ ...theme.errorMsg }}>{errors.firstName?.message}</Typography>
            </Box>
            <Box>
              <LabelForm>Product Price</LabelForm>
              <TextField
                id="number"
                type="text"
                label="Fix a price"
                variant="outlined"
                sx={{ ...theme.formInputFields, my: 1.5 }}
                {...register('productPrice')}
              />
              <Typography sx={{ ...theme.errorMsg }}>{errors.productPrice?.message}</Typography>
            </Box>
            <Box>
              <LabelForm>Select Image</LabelForm>
              <Controller
                name="prodimage"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <TextField
                      accept="image/*"
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)}
                      style={{ marginBottom: '10px' }}
                    />
                    <Typography sx={{ ...theme.errorMsg }}>{errors.prodimage?.message}</Typography>
                  </>
                )}
              />
            </Box>

            <Box>
              <FormLabel id="demo-row-radio-buttons-group-label">Product state</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  control={<Radio />}
                  label="old"
                  {...register('food', { required: 'select one' })}
                  type="radio"
                  name="food"
                  value="Burger"
                  className="form-check-input"
                  id="burger"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="new"
                  {...register('food', { required: 'select one' })}
                  type="radio"
                  name="food"
                  value="Fries"
                  className="form-check-input"
                  id="fries"
                />
              </RadioGroup>
              <Typography sx={{ ...theme.errorMsg }}>{errors.food?.message}</Typography>
            </Box>
            <Box>
              <FormGroup>
                <FormControlLabel
                  {...label}
                  name="selectCheckbox"
                  id="selectCheckbox"
                  {...register('chooseCb')}
                  control={<Checkbox />}
                  label="Required"
                />
                <Typography sx={{ ...theme.errorMsg }}>{errors.chooseCb?.message}</Typography>
              </FormGroup>
            </Box>

            <Button variant="contained" type="submit" sx={{ width: '100%', textTransform: 'capitalize', mt: 2 }}>
              Create
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateProduct;
