import { blue, orange, red } from '@mui/material/colors';
import { createTheme,  } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

const theme = createTheme({
  palette:{
    mode:"light",
    primary:{
      main:'#58442c',
      superLight:"#58442c"
    },
  },
  usePhone :{
    fontSize : "14px",
    fontWeight :"500",
    color : "primary.superLight",
    textDecoration : "underline",
    cursor:"pointer"
  },
  footerText:{
    textAlign:"center",opacity:".7",fontWeight:"300",fontSize:"10px"
  },
  // NavMenu: {
  //   margin: 2,
  //   color: 'white',
  //   display: 'block',
  //   mr:1,
  //   textDecoration:"none",
  //   '&:hover':{
  //     color:"primary.main"
  //   }
  // },
 
  
  formInputFields:{
    width:"100%",
   },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
          borderRadius:"50px",
          fontWeight:"700",
          padding:"9px 16px"
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          background: "transparent",
          boxShadow:"none",padding:"20px 15px"
        }
      }
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: {
           fontSize:"48px",
           fontWeight:"700",
           '@media (max-width: 992px)': {
            fontSize:"2.5rem",
          }
          },
          
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '0px',
          backgroundColor: '#f5f5f5',
        
        },
        elevation1: {
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
    

    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       '--TextField-brandBorderColor': orange[500],
    //       '--TextField-brandBorderHoverColor': orange[500],
    //       '--TextField-brandBorderFocusedColor': orange[500],
    //       '& label.Mui-focused': {
    //         color: 'var(--TextField-brandBorderFocusedColor)',
    //       },
    //     },
    //   },
    // },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     notchedOutline: {
    //       borderColor: 'primary.main',
    //     },
    //     root: {
    //       [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
    //         borderColor: 'var(--TextField-brandBorderHoverColor)',
    //       },
    //       [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
    //         borderColor: 'var(--TextField-brandBorderFocusedColor)',
    //       },
    //     },
    //   },
    // },
    // MuiFilledInput: {
    //   styleOverrides: {
    //     root: {
    //       '&:before, &:after': {
    //         borderBottom: '2px solid var(--TextField-brandBorderColor)',
    //       },
    //       '&:hover:not(.Mui-disabled, .Mui-error):before': {
    //         borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
    //       },
    //       '&.Mui-focused:after': {
    //         borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
    //       },
    //     },
    //   },
    // },
    // MuiInput: {
    //   styleOverrides: {
    //     root: {
    //       '&:before': {
    //         borderBottom: '2px solid var(--TextField-brandBorderColor)',
    //       },
    //       '&:hover:not(.Mui-disabled, .Mui-error):before': {
    //         borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
    //       },
    //       '&.Mui-focused:after': {
    //         borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
    //       },
    //     },
    //   },
    // },
  },
  forgetPassword:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    textDecoration:"none",
    color:"primary.main"
  },
  centeredContent:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    height:"100%",
    // width:"50%",
    // '@media (max-width: 992px)': {
    //   width:"100%",
    // }
    // margin:"0 100px"
  },
  errorMsg:{
    color:'#ff0000',
    fontSize:'14px',
    fontWeight:'500'
  }
 

});


export default theme;
