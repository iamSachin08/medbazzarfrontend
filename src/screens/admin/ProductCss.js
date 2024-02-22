import makeStyles from '@mui/styles/makeStyles';

export const productStyle = makeStyles({
    mainBox:
    {
        display:'flex',
        height:'100vh',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        background:'#ecf0f1'
    },
    box:
    {
        height:'auto',
        width:700,
        borderRadius:15,
        background:'#fff',
        padding:12

    },
    boxDisplay:
    {
        height:'auto',
        width:1100,
        background:'#fff',
        borderRadius:10,
        padding:10
    }
})