import { useRouter } from "next/router";
import { useContext } from "react";
import Cadastrar from "../components/CadastrarUser";
import { AuthContext } from "../src/contexts/contextAuth";

export default function CadastrarUser() {
    
    return (
        <Cadastrar />
    )
}