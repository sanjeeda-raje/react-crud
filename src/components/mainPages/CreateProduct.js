import { React, useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { CartState } from '../../context/Context';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import theme from '../../CartTheme';
import styled from '@emotion/styled';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const schema = yup.object().shape({
  productName: yup.string().required().min(4, 'at least 4').max(15, 'no more than 15'),
  prodDesc: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters').max(100, 'Description cannot exceed 100 characters'),

  productPrice: yup
    .string()
    .required('Price is required')
    .matches(/^\d+(\.\d{1,2})?$/, 'Price must be a valid currency format (e.g., 10.99)')
  ,
  prodQty: yup.string().required('Please select a state.'),

  chooseCb: yup.bool().oneOf([true], 'Checkbox selection is required'),
  food: yup.string().required('Please select one option.'),
  prodimage: yup
  .mixed()
  .test('fileRequired', 'An image is required', (value) => {
    return value && value[0];
  })
  .test('fileSize', 'The file is too large', (value) => {
    if (!value || !value[0]) return true;
    return value[0].size <= 1024 * 1024;
  })
  .test('fileType', 'Unsupported file format', (value) => {
    if (!value || !value[0]) return true;
    return ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
  }),


});

const CreateProduct = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();

  const isUpdating = !!id;
  const [productData, setProductData] = useState([{
    productName: '',
    productDesc: '',
    productPrice: '',
    prodQty: '',
    food: '',
    chooseCb: false,
    prodimage: null,
  }]);

  const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
  ];

  const { state, dispatch } = CartState();
  const [imageUrl, setImageUrl] = useState('');
  
  const LabelForm = styled(InputLabel)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: '700',
  }));

  useEffect(() => {
    if (isUpdating) {
      const productToUpdate = state.products.find(product => product.id === id);
      if (productToUpdate) {
        setProductData(productToUpdate);
      }
    }
  }, [isUpdating, id, state.products]);

  console.log("productData",productData)
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productName: productData.productName,
      prodDesc: productData.productDesc,
      
      productPrice: productData.productPrice,
      prodQty: productData.prodQty,
      food: productData.food,
      chooseCb: productData.chooseCb,
      prodimage: productData.prodimage,}
  });
  const getFiles = (e) => {
    // setFile(console.log(URL.createObjectURL(e.target.files[0])))
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    console.log("url",url)
  }

  const onSubmit = (data) => {
    console.log('data', data);
    if (Object.keys(errors).length === 0) {
      if (isUpdating) {
        // Update product
        dispatch({
          type: 'UPDATE_PRODUCT',
          payload: {
            id: id,
            newData: {
               id: uuidv4(),
                price: productData.productPrice,
                product: productData.productName,
                img: productData.prodimage,
                productname: productData.productName,
                Desc: productData.prodDesc,
                qty: productData.prodQuantity,
                ratings: productData.prodQuantity}
          }
        });
      } else {
        // Add product
        dispatch({
          type: 'ADD_PRODUCT',
          payload: {
                id: uuidv4(),
                price: data.productPrice,
                product: data.productName,
                img: data.prodimage,
                productname: data.productName,
                Desc: data.prodDesc,
                qty: data.prodQuantity,
                ratings: data.prodQuantity,
              },
        });
      }
     
     
      navigate('/');
    }
  };


  return (
    <Container maxWidth="lg" component="main" sx={{}}>
  <Box sx={{ flexGrow: 1, px: 2 }} component="form" autoComplete="off" id="hookForm" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" component="h6" sx={{ mb: 4, fontWeight: '700' }}>
          {isUpdating ? 'Update a Product' : 'Create a Product'}
        </Typography>
    <Grid spacing={2} container sx={{ justifyContent: 'center' }}>
      
      <Grid item xs={12} sm={6}>
        <Box>
          <LabelForm>Product Name</LabelForm>
          <TextField
            id="name"
            type="text"
            label="Name a product"
            variant="outlined"
            sx={{ ...theme.formInputFields, my: 1.5 }}
            {...register('productName')}
          />
          <Typography sx={{ ...theme.errorMsg }}>{errors.productName?.message}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <LabelForm>Product Description</LabelForm>
          <TextField
            id="prodDesc"
            label="Description"
            variant="outlined"
            multiline
            sx={{ ...theme.formInputFields, my: 1.5 }}
            maxRows={4}
            {...register('prodDesc')}
          />
          <Typography sx={{ ...theme.errorMsg }}>{errors.prodDesc?.message}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
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
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{ minWidth: 120 }}>
          <LabelForm sx={{ mb: 3 }}>Select Quantity</LabelForm>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="prodQty"
              rules={{
                required: 'Please Select Qty.',
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <div className="mb-3 ">
                  <Select
                    className="selectWrapper"
                    ref={ref}
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption ? selectedOption.value : '';
                      onChange(selectedValue);
                    }}
                    onBlur={onBlur}
                    value={options.find((option) => option.value === value)}
                    options={options}
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                    placeholder="Select Qty"
                  />
                  <Typography sx={{ ...theme.errorMsg }}>{errors.prodQty?.message}</Typography>
                </div>
              )}
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
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
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <FormGroup>
            <FormControlLabel
              // {...label}
              name="selectCheckbox"
              id="selectCheckbox"
              {...register('chooseCb')}
              control={<Checkbox />}
              label="Required"
            />
            <Typography sx={{ ...theme.errorMsg }}>{errors.chooseCb?.message}</Typography>
          </FormGroup>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        {/* <Box>
          <LabelForm>Select Image</LabelForm>
          <TextField type="file" onChange={getFiles} />
        </Box> */}
        <Box>
  <LabelForm>Select Image</LabelForm>
  <Controller
    name="prodimage"
    control={control}
    defaultValue=""
    render={({ field }) => (
      <>
        <TextField
          type="file"
          onChange={(e) => {
            field.onChange(e.target.files);
            getFiles(e);
          }}
          style={{ marginBottom: '10px' }}
        />
        <Typography sx={{ ...theme.errorMsg }}>{errors.prodimage?.message}</Typography>
      </>
    )}
  />
</Box>

      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          variant="contained"
          type="submit"
          sx={{ width: '20%', textTransform: 'capitalize', mt: 2 }}
        >
          {isUpdating ? 'Update' : 'Create'}
        </Button>
       
      </Grid>
    </Grid>
    {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
  </Box>
</Container>

  );
};

export default CreateProduct;
