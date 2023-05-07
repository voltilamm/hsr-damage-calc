import { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  AppBar,
  Box,
  CssBaseline,
  Grid,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

type FormValues = {
  scalingAttribute: number;
  skillMultiplier: number;
};

function App() {
  const { register, watch } = useForm<FormValues>({
    defaultValues: {
      scalingAttribute: 2000,
      skillMultiplier: 100,
    },
  });

  const [scalingAttribute, skillMultiplier] = watch([
    "scalingAttribute",
    "skillMultiplier",
  ]);

  const baseDamage = useMemo(
    () => (scalingAttribute * skillMultiplier) / 100,
    [scalingAttribute, skillMultiplier]
  );

  return (
    <Box>
      <AppBar component="nav" position="sticky">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h6" component="div">
            ダメージ計算機
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container component="main" sx={{ p: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            {...register("scalingAttribute")}
            id="scaling-attribute"
            label="攻撃力"
            type="number"
            InputLabelProps={{ shrink: true }}
            variant="standard"
          />
          <TextField
            {...register("skillMultiplier")}
            id="skill-multiplier"
            label="倍率"
            type="number"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h6" component="div">
            計算結果
          </Typography>
          <Typography variant="h6" component="div">
            {baseDamage}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
