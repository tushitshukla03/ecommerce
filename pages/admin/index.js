import { Grid } from "@mui/material";

import SalesOverview from "../../src/components/dashboard/SalesOverview";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";

export default function Index() {
  return (
    <ThemeProvider theme={theme}>
    <style jsx global>{`
      footer {display: none;}
    `}</style>
    <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SalesOverview />
      </Grid>
      
    </Grid></FullLayout></ThemeProvider>
    
  );
}
