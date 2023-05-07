import { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  AppBar,
  Box,
  CssBaseline,
  FormControlLabel,
  Grid,
  InputAdornment,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

type FormValues = {
  characterLevel: number;
  enemyLevel: number;
  scalingAttribute: number;
  skillMultiplier: number;
  damageBuff: number;
  defDebuff: number;
  res: number;
  broken: boolean;
};

function App() {
  const { register, watch } = useForm<FormValues>({
    defaultValues: {
      characterLevel: 50,
      enemyLevel: 50,
      scalingAttribute: 2000,
      skillMultiplier: 100,
      damageBuff: 0,
      defDebuff: 0,
      res: 20,
      broken: false,
    },
  });

  const [
    characterLevel,
    enemyLevel,
    scalingAttribute,
    skillMultiplier,
    damageBuff,
    defDebuff,
    res,
    broken,
  ] = watch([
    "characterLevel",
    "enemyLevel",
    "scalingAttribute",
    "skillMultiplier",
    "damageBuff",
    "defDebuff",
    "res",
    "broken",
  ]);

  const enemyDef = useMemo(
    () => (200 + 10 * enemyLevel) * (1 - defDebuff / 100),
    [enemyLevel, defDebuff]
  );

  const defMultiplier = useMemo(
    () => 1 - enemyDef / (enemyDef + 200 + 10 * characterLevel),
    [enemyDef, characterLevel]
  );

  const baseDamage = useMemo(
    () => (scalingAttribute * skillMultiplier) / 100,
    [scalingAttribute, skillMultiplier]
  );

  const damageMultiplier = useMemo(() => 1 + damageBuff / 100, [damageBuff]);

  const resMultiplier = useMemo(() => 1 - res / 100, [res]);

  const toughnessMultiplier = useMemo(() => (broken ? 1 : 0.9), [broken]);

  const damage = useMemo(
    () =>
      baseDamage *
      damageMultiplier *
      defMultiplier *
      resMultiplier *
      toughnessMultiplier,
    [
      baseDamage,
      damageMultiplier,
      defMultiplier,
      resMultiplier,
      toughnessMultiplier,
    ]
  );

  return (
    <Box>
      <AppBar component="nav" position="sticky">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h6" component="div">
            崩壊：スターレイル ダメージ計算機
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container component="main" spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <Grid container component="div" spacing={2}>
            <Grid item xs={6} sm={6} md={3}>
              <TextField
                {...register("characterLevel")}
                fullWidth
                id="character-level"
                label="攻撃キャラLv"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TextField
                {...register("enemyLevel")}
                fullWidth
                id="enemy-level"
                label="敵Lv"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TextField
                {...register("scalingAttribute")}
                fullWidth
                id="scaling-attribute"
                label="攻撃力"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TextField
                {...register("skillMultiplier")}
                fullWidth
                id="skill-multiplier"
                label="倍率"
                type="number"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TextField
                {...register("damageBuff")}
                fullWidth
                id="damage-buff"
                label="ダメージバフ"
                type="number"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TextField
                {...register("defDebuff")}
                fullWidth
                id="def-debuff"
                label="防御デバフ"
                type="number"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TextField
                {...register("res")}
                fullWidth
                id="res"
                label="耐性"
                type="number"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <FormControlLabel
                control={<Switch {...register("broken")} color="primary" />}
                label="弱点撃破"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h5" component="div">
            計算結果
          </Typography>
          <Typography variant="h6" component="div">
            ダメージ: {Math.floor(damage)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
