import { onAuth, signUpWithEmail } from '../firebase/utils'
import Link from 'next/link'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context'
import Particles from '../components/Particles'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import Button from '../components/Button'
import Error from '../components/Error'
import style from '../styles/Login.module.css'

function Login() {
    const { user, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()
    const router = useRouter()

    function loginWithEmail(e) {
        e.preventDefault()
        let email = e.target[0].value
        let password = e.target[1].value
        signUpWithEmail(email, password, setUserSuccess)
    }

    useEffect(() => {
        onAuth(setUserProfile, setUserData, postsIMG, setUserPostsIMG)
        if (user) router.replace('/')
    }, [user]);
    return (

        <div className={style.container}>

            <main className={style.main}>
                <header className={style.header}>INICIO DE SESION COLLAGE</header>
                <div>
                    <img src="/logo.png" className={style.logo} alt="User" />

                </div>

                <form className={style.form} onSubmit={loginWithEmail}>
                    <h2 className={style.subtitle}>REGISTRATE</h2>
                    <input className={style.input} type="text" placeholder="example@gmail.com" />
                    <input className={style.input} type="password" placeholder="contraseña" />
                    <div className={style.buttonsContainer}>
                        <Button style='buttonSecondary'>Registrate</Button>
                    </div>
                    <div className={style.linkContainer} >No tienes una cuenta? <Link href="/Login" legacyBehavior><a className={style.link}>Inicia Sesión</a></Link></div>
                </form>



                <Particles />
            </main>


            {success == false && <Error>ERROR: verifique e intente nuevamente</Error>}
            {success == 'complete' && <Error>Llene todo el formulario</Error>}
        </div>

    )
}

export default Login
