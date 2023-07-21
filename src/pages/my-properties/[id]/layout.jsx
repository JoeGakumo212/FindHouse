
// import React ,{ useState } from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Box from '@mui/system/Box';
// import Tab from '@material-ui/core/Tab';
// import TabContext from '@material-ui/lab/TabContext';
// import TabList from '@material-ui/lab/TabList';
// import TabPanel from '@material-ui/lab/TabPanel';
// import Info from './[id]/Info';
// export default function MyComponent() {
//   const [value, setValue] = useState('1');

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%', typography: 'body1' }}>
//       <TabContext value={value}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <TabList onChange={handleChange} aria-label="lab API tabs example">
//             <Tab label="Item One" value="1" />
//             <Tab label="Item Two" value="2" />
//             <Tab label="Item Three" value="3" />
//           </TabList>
//         </Box>
//         <TabPanel value="1">Item one</TabPanel>
//         <TabPanel value="2"><Info /></TabPanel>
//         <TabPanel value="3">Item Three</TabPanel>
//       </TabContext>
//     </Box>
//   );
// }

