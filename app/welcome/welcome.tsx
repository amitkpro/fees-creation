"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Paper,
  Grid,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  useMediaQuery,
  Container,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Book as BookIcon,
  AttachMoney as MoneyIcon,
  Search as SearchIcon,
  Help as HelpIcon,
  Notifications as NotificationsIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Menu as MenuIcon,
} from "@mui/icons-material"

// Create a theme with primary color matching the UI
const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Blue color from the original design
    },
    secondary: {
      main: "#ffc107", // Yellow/amber color for accents
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 4,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
  },
})

// Interface for tab panel props
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

// Tab Panel component for semester tabs
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`semester-tabpanel-${index}`}
      aria-labelledby={`semester-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>}
    </div>
  )
}

// Helper function for accessibility props
function a11yProps(index: number) {
  return {
    id: `semester-tab-${index}`,
    "aria-controls": `semester-tabpanel-${index}`,
  }
}

export default function FeesCreation() {
  // State management
  const [tabValue, setTabValue] = useState(0)
  const [programLevel, setProgramLevel] = useState("")
  const [programType, setProgramType] = useState("")
  const [programName, setProgramName] = useState("")
  const [feeTemplate, setFeeTemplate] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Sample fees data
  const [feesData, setFeesData] = useState([
    { id: 1, name: "Tuition Fee", amount: "30,000" },
    { id: 2, name: "Lab Fee", amount: "10,000" },
    { id: 3, name: "Sports Fee", amount: "10,000" },
  ])

  // Media query for responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  // Calculate total amount from fees data
  const totalAmount = feesData.reduce((sum, fee) => {
    const amount = Number.parseFloat(fee.amount.replace(/,/g, ""))
    return sum + (isNaN(amount) ? 0 : amount)
  }, 0)

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Toggle drawer for mobile view
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  // Sidebar content component
  const SidebarContent = () => (
    <>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <IconButton aria-label="logo">
          <Box
            component="div"
            sx={{
              width: 24,
              height: 24,
              borderRadius: 1,
              bgcolor: "#f0f0f0",
            }}
          />
        </IconButton>
      </Box>
      <Divider />
      <List aria-label="main navigation">
        <ListItem button component="a" href="#dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component="a" href="#bos">
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="BOS" />
        </ListItem>
        <ListItem button component="a" href="#program">
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Program" />
        </ListItem>
        <ListItem
          button
          selected
          component="a"
          href="#fees-creation"
          sx={{
            backgroundColor: "#e3f2fd",
            borderRadius: "0 24px 24px 0",
            "&.Mui-selected": {
              backgroundColor: "#e3f2fd",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#d0e8fd",
            },
          }}
        >
          <ListItemIcon>
            <MoneyIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Fees Creation"
            primaryTypographyProps={{
              color: "primary",
              fontWeight: "medium",
            }}
          />
        </ListItem>
      </List>
    </>
  )

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Permanent sidebar for desktop */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#fff",
              borderRight: "1px solid #e0e0e0",
            },
          }}
        >
          <SidebarContent />
        </Drawer>

        {/* Temporary drawer for mobile */}
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#fff",
            },
          }}
        >
          <SidebarContent />
        </Drawer>

        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, backgroundColor: "#f5f5f5" }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              backgroundColor: "#fff",
              p: { xs: 1, md: 1.5 },
              borderRadius: 1,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <TextField
              size="small"
              placeholder="Search..."
              variant="outlined"
              aria-label="Search"
              sx={{ ml: { xs: 1, md: 2 }, width: { xs: 120, sm: 200 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
              <IconButton aria-label="Help">
                <HelpIcon />
              </IconButton>
              <IconButton aria-label="Notifications">
                <NotificationsIcon />
              </IconButton>
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }} alt="Aarohi Shah">
                  AS
                </Avatar>
                <Box sx={{ ml: 1, display: { xs: "none", sm: "block" } }}>
                  <Typography variant="body2" fontWeight="bold">
                    Aarohi Shah
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Admin
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Content */}
          <Container maxWidth="xl" disableGutters>
            <Paper
              sx={{
                p: { xs: 2, md: 3 },
                mb: 3,
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Typography variant="h6" color="#0065A7" fontWeight="bold" gutterBottom>
                Fees Creation
              </Typography>
              <Divider sx={{ my: 2, borderColor: theme.palette.secondary.main }} />

              <Box sx={{ mt: 3 }}>
                <Typography color="#1662A6" variant="subtitle1" gutterBottom>
                  Name & Fees Creation
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type something"
                  variant="outlined"
                  aria-label="Name & Fees Creation"
                  sx={{ mb: 3, backgroundColor: "#fff" }}
                />

<Grid container spacing={2} >
  <Grid item xs={12} md={6} sx={{ width: "49%" }} >
    <Typography color="#1662A6" variant="subtitle1" gutterBottom>
      Program Level
    </Typography>
    <FormControl fullWidth size="small">
      <Select
        value={programLevel}
        onChange={(e) => setProgramLevel(e.target.value as string)}
        displayEmpty
        renderValue={(selected) => (selected ? selected : "Select")}
        endAdornment={<KeyboardArrowDownIcon />}
        inputProps={{ "aria-label": "Program Level" }}
      >
        <MenuItem value="undergraduate">Undergraduate</MenuItem>
        <MenuItem value="postgraduate">Postgraduate</MenuItem>
        <MenuItem value="diploma">Diploma</MenuItem>
      </Select>
    </FormControl>
  </Grid>
  <Grid item xs={12} md={6}  sx={{ width: "49%" }}>
    <Typography color="#1662A6" variant="subtitle1" gutterBottom>
      Program Type
    </Typography>
    <FormControl fullWidth size="small">
      <Select
        value={programType}
        onChange={(e) => setProgramType(e.target.value as string)}
        displayEmpty
        renderValue={(selected) => (selected ? selected : "Select")}
        endAdornment={<KeyboardArrowDownIcon />}
        inputProps={{ "aria-label": "Program Type" }}
      >
        <MenuItem value="regular">Regular</MenuItem>
        <MenuItem value="distance">Distance</MenuItem>
        <MenuItem value="online">Online</MenuItem>
      </Select>
    </FormControl>
  </Grid>
</Grid>


                <Box sx={{ mt: 3 }}>
                <Grid item xs={12} md={6}  lg={6} sx={{ width: "49%" }} >
                <Typography variant="subtitle1" gutterBottom>
                    Program Name
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={programName}
                      onChange={(e) => setProgramName(e.target.value as string)}
                      displayEmpty
                      renderValue={(selected) => (selected ? selected : "Select")}
                      endAdornment={<KeyboardArrowDownIcon />}
                      inputProps={{ "aria-label": "Program Name" }}
                    >
                      <MenuItem value="btech">B.Tech</MenuItem>
                      <MenuItem value="bba">BBA</MenuItem>
                      <MenuItem value="bsc">B.Sc</MenuItem>
                    </Select>
                  </FormControl>

                </Grid>
                 
                </Box>

                {/* Program Run in Colleges */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Program Run in Colleges
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={4}>
              <CollegeCard >
                <Box sx={{ 
                  backgroundColor: '#fff9c4', 
                  p: 1, 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <SchoolIcon sx={{ color: '#ffd600' }} />
                </Box>
                <Typography>College Name</Typography>
              </CollegeCard>
            </Grid>
            <Grid item xs={4}>
              <CollegeCard >
                <Box sx={{ 
                  backgroundColor: '#bbdefb', 
                  p: 1, 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <SchoolIcon sx={{ color: '#2196f3' }} />
                </Box>
                <Typography>College Name</Typography>
              </CollegeCard>
            </Grid>
            <Grid item xs={4}>
              <CollegeCard >
                <Box sx={{ 
                  backgroundColor: '#fff9c4', 
                  p: 1, 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <SchoolIcon sx={{ color: '#ffd600' }} />
                </Box>
                <Typography>College Name</Typography>
              </CollegeCard>
            </Grid>
          </Grid>

                </Box>

                {/* Fees Details with Semester Tabs */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: "#0277bd", fontWeight: "medium" }}>
                    Fees Details
                  </Typography>
                  <Box
                    sx={{
                      borderBottom: 0,
                      display: "flex",
                      overflowX: "auto",
                    }}
                  >
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      aria-label="semester tabs"
                      variant={isMobile ? "scrollable" : "standard"}
                      scrollButtons={isMobile ? "auto" : false}
                      TabIndicatorProps={{ style: { display: "none" } }}
                      sx={{ minHeight: "40px" }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem, index) => (
                        <Tab
                          key={sem}
                          label={`Sem ${sem}`}
                          {...a11yProps(index)}
                          sx={{
                            backgroundColor: tabValue === index ? "#0277bd" : "transparent",
                            color: tabValue === index ? "#fff" : "#0277bd",
                            borderRadius: "4px 4px 0 0",
                            minWidth: 80,
                            minHeight: "40px",
                            padding: "8px 16px",
                            margin: "0 4px",
                            textTransform: "none",
                            fontWeight: "medium",
                            fontSize: "14px",
                          }}
                        />
                      ))}
                    </Tabs>
                  </Box>

                  {/* Semester 1 Tab Panel */}
                  <TabPanel value={tabValue} index={0}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={7}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" gutterBottom sx={{ color: "#0277bd", fontWeight: "medium" }}>
                            Select Fees Payment Templates
                          </Typography>
                          <FormControl fullWidth size="small">
                            <Select
                              value={feeTemplate}
                              onChange={(e) => setFeeTemplate(e.target.value as string)}
                              displayEmpty
                              renderValue={(selected) => (selected ? selected : "Select")}
                              endAdornment={<KeyboardArrowDownIcon />}
                              inputProps={{ "aria-label": "Fee Template" }}
                              sx={{
                                backgroundColor: "#fff",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#e0e0e0",
                                },
                              }}
                            >
                              <MenuItem value="template1">Template 1</MenuItem>
                              <MenuItem value="template2">Template 2</MenuItem>
                              <MenuItem value="template3">Template 3</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>

                        {/* Fee Entry Fields - Exactly 3 rows as shown in the image */}
                        {[1, 2, 3].map((item) => (
                          <Grid container spacing={2} key={item} sx={{ mb: 2 }}>
                            <Grid item xs={12} sm={6}>
                              <Typography
                                variant="subtitle2"
                                gutterBottom
                                sx={{ color: "#0277bd", fontWeight: "medium" }}
                              >
                                Fees Name
                              </Typography>
                              <TextField
                                fullWidth
                                size="small"
                                placeholder="Default"
                                variant="outlined"
                                aria-label={`Fee Name ${item}`}
                                sx={{
                                  backgroundColor: "#fff",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e0e0e0",
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography
                                variant="subtitle2"
                                gutterBottom
                                sx={{ color: "#0277bd", fontWeight: "medium" }}
                              >
                                Fees Amount
                              </Typography>
                              <TextField
                                fullWidth
                                size="small"
                                placeholder="NUM"
                                variant="outlined"
                                aria-label={`Fee Amount ${item}`}
                                sx={{
                                  backgroundColor: "#fff",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e0e0e0",
                                  },
                                }}
                              />
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>

                      {/* Total Fees Summary Table */}
                      <Grid item xs={12} md={5}>
                        <Typography variant="subtitle2" gutterBottom sx={{ color: "#0277bd", fontWeight: "medium" }}>
                          Total Fees Amount
                        </Typography>
                        <TableContainer
                          component={Paper}
                          sx={{
                            backgroundColor: "#e3f2fd",
                            borderRadius: 2,
                            boxShadow: "none",
                            overflow: "hidden",
                          }}
                        >
                          <Table size="small" aria-label="fees summary table">
                            <TableHead>
                              <TableRow sx={{ backgroundColor: "#bbdefb" }}>
                                <TableCell sx={{ fontWeight: "medium", color: "#0277bd", width: "10%" }}>No</TableCell>
                                <TableCell sx={{ fontWeight: "medium", color: "#0277bd", width: "50%" }}>
                                  Fees Name
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: "medium", color: "#0277bd", width: "40%" }}>
                                  Fees Amount
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {feesData.map((row) => (
                                <TableRow key={row.id} sx={{ backgroundColor: "transparent" }}>
                                  <TableCell>{row.id}</TableCell>
                                  <TableCell>{row.name}</TableCell>
                                  <TableCell align="right">{row.amount}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow sx={{ backgroundColor: "#bbdefb" }}>
                                <TableCell colSpan={2} sx={{ fontWeight: "medium", color: "#0277bd" }}>
                                  Total Fees Amount
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: "medium" }}>
                                  {totalAmount.toLocaleString()}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </TabPanel>

                  {/* Other semester tab panels would go here */}
                  {[1, 2, 3, 4, 5, 6, 7].map((sem, index) => (
                    <TabPanel key={sem} value={tabValue} index={index + 1}>
                      <Box sx={{ p: 2, textAlign: "center" }}>
                        <Typography variant="body1">Semester {index + 2} content</Typography>
                      </Box>
                    </TabPanel>
                  ))}
                </Box>
              </Box>
            </Paper>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  px: 3,
                  py: 1,
                  fontWeight: "medium",
                }}
              >
                Next / Apply
              </Button>
              <Button variant="text" color="inherit" sx={{ fontWeight: "medium" }}>
                Cancel
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}




// colors : #1662A6 , #0065A7, #2196f3




const CollegeCard = styled(Paper)(({ theme }:any) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  height: '100%',
  cursor: 'pointer',
  backgroundColor: true ? '#e3f2fd' : '#fff',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  }
}));
