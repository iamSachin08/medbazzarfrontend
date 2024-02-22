import makeStyles from '@mui/styles/makeStyles';

 export const useStyles = makeStyles({
    root: {
      display: 'flex',
      width:'100%',
      height:'100vh',
      justifyContent:'center',
      fontFamily:'Kanit',
      alignItems:'center',
      background:'#ecf0f1'
    },

    box:{
        width:600,
        height:'auto',
        background:'#fff',
        borderRadius:10,
        padding:10,
    },
    boxDisplay:{
        width:800,
        height:'auto',
        background:'#fff',
        borderRadius:10,
        padding:10,

    }
});