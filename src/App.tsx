import { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardHeader,
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
  critRate: number;
  critDamage: number;
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
      skillMultiplier: 50,
      critRate: 5,
      critDamage: 50,
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
    critRate,
    critDamage,
    damageBuff,
    defDebuff,
    res,
    broken,
  ] = watch([
    "characterLevel",
    "enemyLevel",
    "scalingAttribute",
    "skillMultiplier",
    "critRate",
    "critDamage",
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

  const minDamage = useMemo(
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

  const maxDamage = useMemo(
    () => minDamage * (1 + critDamage / 100),
    [minDamage, critDamage]
  );

  const expectedDamage = useMemo(
    () => (1 - critRate / 100) * minDamage + (critRate / 100) * maxDamage,
    [critRate, minDamage, maxDamage]
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
      <Grid container component="main" sx={{ p: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
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
                    label="スキル倍率"
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
                    {...register("critRate")}
                    fullWidth
                    id="crit-rate"
                    label="会心率"
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
                    {...register("critDamage")}
                    fullWidth
                    id="crit-damage"
                    label="会心ダメージ"
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
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              title="計算結果"
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Typography variant="subtitle1">非会心</Typography>
              <Typography variant="h4">
                {Math.floor(minDamage).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1">会心</Typography>
              <Typography variant="h4">
                {Math.floor(maxDamage).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1">期待値</Typography>
              <Typography variant="h4">
                {Math.floor(expectedDamage).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
