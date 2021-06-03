import React from "react";
import CovidForm from "./components/CovidForm/CovidForm";
import Seamless from "./assets/seamless.jpeg";

function App() {
    return (
        <div
            className="App"
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                background: `url(${Seamless})`,
                backgroundSize: "300px 300px",
                overflow: "hidden",
            }}
        >
            <CovidForm />
        </div>
    );
}

export default App;
