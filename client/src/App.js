import { useState, useEffect } from "react";
import { AuthContext } from "./context";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import { getAllData, tokenCheck } from "./http/userAPI";
import Loading from "./components/UI/Loading";
import { useDispatch } from "react-redux";
import { updateData } from "./redux/actions";
import { getToken, setToken } from "./http";
import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./components/AuthRoutes";
import Sidebar from "./components/UI/Sidebar";
import styled from "styled-components";
import { Box } from "@mui/system";
import AppRoutes from "./components/AppRoutes";


const Main = styled(Box)`
    padding: 20px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.025);
    overflow-y: scroll;
`

export default function App() {

    const dispatch = useDispatch()

    const [auth, setAuth] = useState({
        isAuth: !!getToken(),
        isLoading: true
    })

    const [keepLogged, setKeepLogged] = useState(!!getToken(true))

    useEffect(() => {
        if (getToken()) {
            tokenCheck().then(res => {
                if (res.token) {
                    setToken(res.token, keepLogged)
                    getAllData().then(res => {
                        dispatch(updateData(res));
                        setAuth({isAuth: true, isLoading: false})
                    })
                } else {
                    setAuth({isAuth: false, isLoading: false})
                }
            })
        } else {
            setAuth({isAuth: false, isLoading: false})
        }
    }, [auth.isAuth, dispatch, keepLogged])

    if (auth.isLoading) {
        return (
            <ThemeProvider theme={theme}>
                <Loading />
            </ThemeProvider>
        )
    } else {
        return (
            <AuthContext.Provider value={{auth, setAuth, keepLogged, setKeepLogged}}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        {auth.isAuth
                        ? <>
                            <Sidebar />
                            <Main component='main'>
                                <AppRoutes />
                            </Main>
                        </>
                        : <AuthRoutes />
                        }
                    </BrowserRouter>
                </ThemeProvider>
            </AuthContext.Provider>
        );
    }
}