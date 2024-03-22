// import { useState } from 'react';
// import { AppBar, Toolbar, Typography, Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, CssBaseline, IconButton, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';

// import { Menu as MenuIcon } from '@mui/icons-material';

// import { map as _map } from 'lodash-es'
// import useStore from '../zustand/store';

import pnrlogo from '../PNR_Logo-removebg-preview.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// import NavDropdown from 'react-bootstrap/NavDropdown';



// const drawerWidth = 240;
// const routes = [
//     {
//         name: "home",
//         label: "Home",
//     },
//     {
//         name: "job-list",
//         label: "Job List",
//     },
//     {
//         name: "about-us",
//         label: "About Us",
//     },
//     {
//         name: "contact-us",
//         label: "Contact Us",
//     },
// ]
function NavigationBar() {

    return (



        <Navbar expand="lg" style={{ backgroundColor: 'rgb(242 246 255)' }}>
            <Container >
                <Navbar.Brand className='col-xl-2 col-lg-3 col-2'>
                    <div className="logocontainer">
                        <Link to="/">
                            <img src={pnrlogo} alt="pnrlogo" style={{ width: '100%', height: '100%' }} />
                        </Link>
                    </div>
                </Navbar.Brand>
                <div id="scroll-container" className='col-lg-4 col-xl-6 col-5'>
                    <p id="scroll-text" className='m-0 text-center fw-semibold'>We Recruit Faculties All Over India for JEE Advanced ,JEE Mains, NEET & Foundation (6th to 10th) for reputed colleges for more details contact us (9848099977, 9440221111, 9676059977).</p>
                </div>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav  col-xl-4">
                    <Nav className="ms-auto navanchors">
                        <Nav.Link>
                            <Link to="/">Home</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/positionslist">Find Positions</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/contact">Contact Us</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/aboutus">About Us</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}


// function NavigationBar(props: Props): JSX.Element {
//     const { window } = props;
//     const [mobileOpen, setMobileOpen] = useState(false);

//     const count = useStore(state => state.count)

//     const handleDrawerToggle = () => {
//         setMobileOpen((prevState) => !prevState);
//     };

//     const drawer = (
//         <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//             <Typography variant="h6" sx={{ my: 2 }}>
//                 PNR Cosultancy
//             </Typography>
//             <Divider />
//             <List>
//                 {
//                     _map(routes, ({ name, label }) => (
//                         <ListItem key={name} disablePadding>
//                             <ListItemButton sx={{ textAlign: 'center' }}>
//                                 <ListItemText primary={label} />
//                             </ListItemButton>
//                         </ListItem>
//                     ))
//                 }
//             </List>
//         </Box>
//     );

//     const container =
//         window !== undefined ? () => window().document.body : undefined;

//     return (
//         <Box sx={{ display: 'flex' }}>

//             <CssBaseline />
//             <AppBar component="nav">
//                 <Toolbar sx={{ background: "white" }}>
//                     <IconButton
//                         color="inherit"
//                         aria-label="open drawer"
//                         edge="start"
//                         onClick={handleDrawerToggle}
//                         sx={{ mr: 2, display: { sm: 'none' } }}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography
//                         variant="h6"
//                         component="div"
//                         sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: 'black' }}
//                     >
//                         PNR Consultancy1
//                     </Typography>
//                     <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//                         {
//                             _map(routes, ({ name, label }) => (
//                                 <Button key={name} sx={{ color: '#292929', fontWeight: 600 }} component={Link} to={`/${name}`}>
//                                     {label}
//                                 </Button>
//                             ))
//                         }
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//             <Box component="nav">
//                 <Drawer
//                     container={container}
//                     variant="temporary"
//                     open={mobileOpen}
//                     onClose={handleDrawerToggle}
//                     ModalProps={{
//                         keepMounted: true, // Better open performance on mobile.
//                     }}
//                     sx={{
//                         display: { xs: 'block', sm: 'none' },
//                         '& .MuiDrawer-paper': {
//                             boxSizing: 'border-box',
//                             width: drawerWidth,
//                         },
//                     }}
//                 >
//                     {drawer}
//                 </Drawer>
//             </Box>
//             {/* <Box component="main" sx={{ p: 3 }}>
//                 <Toolbar />
//             </Box> */}
//         </Box>
//     )
// }

export default NavigationBar;
