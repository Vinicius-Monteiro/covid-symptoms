import React from "react";
import {
    Paper,
    Typography,
    Grid,
    Box,
    Button,
    Slide,
    Switch,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";

const SwitchQuestion = ({
    title,
    leftSideSwitch,
    rightSideSwitch,
    checked,
    setChecked,
    currentStage,
    setCurrentStage,
    index,
    setNoSymptom,
}) => {
    return (
        <Slide in={currentStage === index} direction="left" mountOnEnter>
            <Grid item xs={12} sm={6}>
                <Paper style={{ padding: "5rem" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography color="primary" variant="h4">
                            {title}
                        </Typography>
                        <Typography color="textSecondary">
                            Pergunta {index}/9
                        </Typography>
                    </div>
                    <Box my={2}>
                        <Grid
                            container
                            alignItems="center"
                            justify="center"
                            spacing={1}
                        >
                            <Grid item xs={5}>
                                <Typography
                                    align="right"
                                    color={checked ? "secondary" : "primary"}
                                >
                                    {leftSideSwitch}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Switch
                                    checked={checked}
                                    color="primary"
                                    onChange={(event) =>
                                        setChecked(event.target.checked)
                                    }
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Typography
                                    align="left"
                                    color={checked ? "primary" : "secondary"}
                                >
                                    {rightSideSwitch}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        mt={6}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            color="primary"
                            variant="text"
                            onClick={() => {
                                if (currentStage > 0) {
                                    setCurrentStage(currentStage - 1);
                                }
                            }}
                        >
                            Anterior
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            endIcon={<Send />}
                            onClick={() => {
                                if (checked) {
                                    setNoSymptom(false);
                                }
                                setCurrentStage(currentStage + 1);
                            }}
                        >
                            Próximo
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Slide>
    );
};

export default SwitchQuestion;
