import React, { useState } from "react";
import {
    Paper,
    Typography,
    Grid,
    Box,
    Button,
    Slide,
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import SwitchQuestion from "../SwitchQuestion/SwitchQuestion";
import api from "../../api";

const CovidForm = () => {
    const [fever, setFever] = useState(true);
    const [tired, setTired] = useState(true);
    const [cough, setCough] = useState(true);
    const [difficultyBreathing, setDifficultyBreathing] = useState(true);
    const [soreThroat, setSoreThroat] = useState(true);
    const [pains, setPains] = useState(true);
    const [nasalCongestion, setNasalCongestion] = useState(true);
    const [runnyNose, setRunnyNose] = useState(true);
    const [diarrhea, setDiarrhea] = useState(true);
    const [noSymptom, setNoSymptom] = useState(true);

    const [currentStage, setCurrentStage] = useState(0);

    const [loading, setLoading] = useState(true);

    const [severity, setSeverity] = useState("");
    const [certainty, setCertainty] = useState("");

    const questionsMap = [
        {
            title: "Você apresenta febre ?",
            leftSideSwitch: "Não",
            rightSideSwitch: "Sim",
            checked: fever,
            setChecked: setFever,
        },
        {
            title: "Você sente cansaço ?",
            leftSideSwitch: "Não",
            rightSideSwitch: "Sim",
            checked: tired,
            setChecked: setTired,
        },
        {
            title: "Você apresenta tosse seca ?",
            leftSideSwitch: "Não",
            rightSideSwitch: "Sim",
            checked: cough,
            setChecked: setCough,
        },
        {
            title: "Você sente dificuldade em respirar ?",
            leftSideSwitch: "Não",
            rightSideSwitch: "Sim",
            checked: difficultyBreathing,
            setChecked: setDifficultyBreathing,
        },
        {
            title: "Você apresenta garganta inflamada ?",
            leftSideSwitch: "Não",
            rightSideSwitch: "Sim",
            checked: soreThroat,
            setChecked: setSoreThroat,
        },
        {
            title: "Você sente dores ?",
            leftSideSwitch: "Não",
            rightSideSwitch: "Sim",
            checked: pains,
            setChecked: setPains,
        },
        {
            title: "Você apresenta congestão nasal ?",
            leftSideSwitch: "Não",
            rightSideSwitch: "Sim",
            checked: nasalCongestion,
            setChecked: setNasalCongestion,
        },
        // {
        //     title: "Você apresenta secreção nasal ?",
        //     leftSideSwitch: "Não",
        //     rightSideSwitch: "Sim",
        //     checked: runnyNose,
        //     setChecked: setRunnyNose,
        // },
        // {
        //     title: "Você apresenta diarreia ?",
        //     leftSideSwitch: "Não",
        //     rightSideSwitch: "Sim",
        //     checked: diarrhea,
        //     setChecked: setDiarrhea,
        // },
    ];

    const processResults = async () => {
        try {
            setLoading(true);
            const response = await api.post("/", {
                fever,
                tired,
                cough,
                difficultyBreathing,
                soreThroat,
                noSymptom,
                pains,
                nasalCongestion,
            });
            const results = response.data.split(" ");
            if (results.length) {
                setSeverity(results[0]);
                setCertainty(results[1]);
                setCurrentStage(currentStage + 1);
            }
            console.log(results);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    return (
        <Grid container justify="center" alignItems="center">
            {currentStage === 0 && (
                <Slide in={currentStage === 0} direction="left">
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: "5rem" }} elevation={2}>
                            <Typography
                                color="primary"
                                variant="h5"
                                align="center"
                                gutterBottom
                            >
                                Nos conte seus sintomas e iremos avaliar a
                                gravidade do seu caso utilizando técnicas de
                                machine learning
                            </Typography>
                            <Box
                                mt={6}
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                    endIcon={<Send />}
                                    onClick={() => {
                                        setCurrentStage(currentStage + 1);
                                    }}
                                >
                                    Próximo
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Slide>
            )}
            {currentStage > 0 &&
                questionsMap.map((question, index) => {
                    if (index + 1 === currentStage) {
                        return (
                            <SwitchQuestion
                                title={question.title}
                                leftSideSwitch={question.leftSideSwitch}
                                rightSideSwitch={question.rightSideSwitch}
                                checked={question.checked}
                                setChecked={question.setChecked}
                                currentStage={currentStage}
                                setCurrentStage={setCurrentStage}
                                setNoSymptom={setNoSymptom}
                                index={index + 1}
                                key={index + 1}
                            />
                        );
                    } else return null;
                })}
            {currentStage === 8 && (
                <Slide in={currentStage === 8} direction="left">
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: "5rem" }} elevation={2}>
                            <Typography
                                color="primary"
                                variant="h5"
                                align="center"
                                gutterBottom
                            >
                                Pressione "Resgatar Gravidade" para que
                                processemos a gravidade dos seus sintomas
                            </Typography>
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
                                    onClick={() =>
                                        setCurrentStage(currentStage - 1)
                                    }
                                >
                                    Anterior
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    endIcon={<Send />}
                                    onClick={processResults}
                                >
                                    Resgatar Resultados
                                </Button>
                            </Box>
                            <Backdrop open={loading}>
                                <CircularProgress color="primary" />
                            </Backdrop>
                        </Paper>
                    </Grid>
                </Slide>
            )}
            {currentStage === 9 && (
                <Slide in={currentStage === 9} direction="left">
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: "5rem" }} elevation={2}>
                            <Typography
                                color="primary"
                                variant="h5"
                                align="center"
                                gutterBottom
                            >
                                Seu quadro é {severity} com {certainty} de
                                confiança
                            </Typography>
                            <Box mt={6}>
                                <Button
                                    color="primary"
                                    variant="text"
                                    onClick={() => setCurrentStage(0)}
                                >
                                    Voltar ao início
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Slide>
            )}
        </Grid>
    );
};

export default CovidForm;
