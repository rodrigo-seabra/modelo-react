import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, json, Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [login, setLogin] = useState(false);
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      localStorage.setItem("user", JSON.stringify({ email: email }));
      setEmail("");
      setSenha("");
      navigate("/"); //mandando para raíz do app
    } else {
    }
  }, [login]);

  function Autenticar(evento) {
    // o evento pode ser abreviado para e
    evento.preventDefault();

    //requisiçoes assincronas, o js trabalha essas requisições como promessas (pois ele libera o código enquanto as coisas estão acontecendo) - promisse ES7/ javascript
    fetch(process.env.REACT_APP_BACKEND + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
      /* O fetch faz uma requisição para a url escrita, e fala para o servidor as informações que vão mandar. 
            Primeiro informa o metodo de envio, nesse caso é o POST (forma de envio de dados "camuflados"), 
            porém há mais outros 4 metodos de envio de dados.
            Depois especifica-se o tipo de requisição no headers (nesse caso em JSON), e no body vai as informações captadas pelos inputs em JSON*/
    })
      .then((resposta) =>
        resposta.json()
      ) /*then - então se foi feito tudo certo pega a respotas e transforma em JSON*/
      .then((json) => {
        if (json.user) {
          setLogin(true);
        } else {
          /*localStorage.setItem("token", json.access_token);*/
          setErro(true);
        }
      }) /* então pega a respota e faz as verificações, devolvendo um token de autorização que fica salvo no local storage*/
      .catch((erro) => {
        setErro(true);
      }); /* catch - erro*/
  }

  return (
    <Container component="section" maxWidth="xs">
      <Box
        sx={{
          mt: 20,
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Entrar
        </Typography>
        {erro && (
          <Alert severity="error">Revise seus dados e tente novamente</Alert>
        )}
        <Box component="form" onSubmit={Autenticar}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            {...(erro && "error")}
          />

          <TextField
            InputAdornment
            type="password"
            label="Senha"
            variant="outlined"
            margin="normal"
            fullWidth
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="lembrar"
                value={lembrar}
                onChange={(e) => setLembrar(!lembrar)}
              />
            }
            /* a ! é usada para negar o valor, 
                    no caso inverter ele, aqui por padrão o valor era falso entao ao clicar essa
                    funçao age invertendo isso para true, e vice-versa*/
            label="Lembrar-me"
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            type="submit"
          >
            Login
          </Button>

          <Grid container>
            <Grid item xs>
              Esqueci minha senha
            </Grid>
            <Grid item>Cadastrar</Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
