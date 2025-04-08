import React from "react";
import "./Home.css"
import Principal from "../Components/Principal/Principal";

export default function Home() {
    return (
        <div>
            <div className="centralizacao">
            <img src="src/assets/img/NARUTO-01-04-2025 1.png" alt="" />
            </div>
            <h1>Personagens</h1>
            <Principal />  
        </div>
    );
}
