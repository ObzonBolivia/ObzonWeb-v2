import { onAuth, signInWithEmail, handleSignOut, removeData, writeUserData } from '../firebase/utils'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context'
import Particles from '../components/Particles'

import { WithAuth } from '../HOCs/WithAuth'
import Layout from '../layout/Layout'
import Error from '../components/Error'
import Success from '../components/Success'

import Button from '../components/Button'
import Modal from '../components/Modal'

import style from '../styles/Admin.module.css'

function Admin() {
  const { user, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()
  const router = useRouter()

  const [mode, setMode] = useState(false)

  const [arr, setArr] = useState([1, 2, 3])
  const [numeration, setNumeration] = useState([[1, 2, 3, 4, 5, 6, 7, 8, 9,], [10, 11, 12, 13, 14, 15, 16, 17, 18], [19, 20, 21, 22, 23, 24, 25, 26, 27], [28, 29, 30, 31, 32, 33, 34, 35, 36]])
  const [pluss, setPluss] = useState(false)
  const [qr, setQr] = useState(true)
  const [funcion, setIFuncion] = useState(null)

  const [item, setItem] = useState(null)
  const [templates, setTemplates] = useState({
    template1: [
      'h', 'h', 'h',
      'h', 'v', 'h',
      'h', 'v', 'h'],
    template2: [
      'h', 'h', 'h',
      'h', 'v', 'h',
      'h', 'h', 'h'],
    template3: [
      'h', 'h', 'v',
      'v', 'h', 'h',
      'v', 'h', 'h'],
    template4: [
      'v', 'v', 'v',
      'v', 'v', 'v',
      'v', 'v', 'v'],

  })

  console.log(userDB)

  const [opacity, setOpacity] = useState(false);
  function nextClick(e) {
    e.preventDefault()
    if (!navigator.onLine) {
      setUserSuccess('NoInternet')
      return
    }
    const code = e.target.form[0].value
    getCode(code, user.uid, setUserSuccess, userDB.profesor)
  }
  function backClick(e) {
    e.preventDefault()
    router.back()
  }

  function arrItemsHandler() {
    if (arr.length > 2) {
      return
    }
    const copyListItems = [...arr]
    const arrPop = copyListItems.pop()
    setArr([...arr, arrPop == undefined ? 1 : arrPop + 1])
  }
  function handlerQR() {
    setQr(true)
  }
  function plussButton(key) {
    setPluss(!pluss)
  }



  function handlerFunction(fun, i) {
    setMode(true)
    setItem(i)
    setIFuncion(fun)
  }
  function active() {
    const obj = {
      uid: 'active'
    }
    writeUserData(`/users/${item}`, obj, setUserSuccess, 'ACTIVADO')
  }

  function desactive() {
    const obj = {
      uid: null
    }
    writeUserData(`/users/${item}`, obj, setUserSuccess, 'DESACTIVADO')
  }

  function remove() {
    removeData(`/users/${item}`, setUserData, setUserSuccess, 'ELIMINADO')
  }

  function asignar() {
    console.log('asignar')
    const obj = {
      rol: 'Admin'
    }
    writeUserData(`/users/${item}`, obj, setUserSuccess, 'ASIGNADO')
  }

  function quitar() {
    const obj = {
      rol: null
    }
    writeUserData(`/users/${item}`, obj, setUserSuccess, 'ROL QUITADO')
  }

  function removeQR() {
    setQr(!qr)
  }
  
  function x() {
    setMode(!mode)
  }

  return (


    <Layout>
      {success == 'ACTIVADO' && <Success>ACTIVADO</Success>}
      {success == 'DESACTIVADO' && <Error>DESACTIVADO</Error>}
      {success == 'ELIMINADO' && <Success>ELIMINADO</Success>}
      {success == 'ROL QUITADO' && <Error>ROL QUITADO</Error>}
      {success == 'ASIGNADO' && <Success>ASIGNADO</Success>}
      <div className={style.container}>

        <h3 className={style.subtitle}> Administrar Usuarios</h3>
        {userDB.users &&
          <div>
            {Object.keys(userDB.users).map((i, index) => {
              return <div className={style.users}>
                <span>{userDB.users[i].email !== undefined ? userDB.users[i].email : userDB.users[i].displayName}</span>
                <span className={userDB.users[i].uid ? style.green : style.red}>{userDB.users[i].uid ? 'Active' : 'No Active'}</span>
                <Button style='buttonSecondary' click={() => handlerFunction('activar', i)}>Activar</Button>
                <Button style='buttonSecondary' click={() => handlerFunction('desactivar', i)}>Desactivar</Button>
                {userDB.users[i].rol == 'Admin'
                  ? <Button style='buttonSuccess' click={() => handlerFunction('QUITAR EL ROL ADMIN de', i)}>Admin</Button>
                  : <Button style='buttonSecondary' click={() => handlerFunction('ASIGNAR EL ROL ADMIN a', i)}>No Admin</Button>}
                <Button style='buttonPrimary' click={() => handlerFunction('eliminar', i)}>Eliminar</Button>
              </div>
            }
            )}
          </div>}

        {success == false && <Error>ERROR: verifique e intente nuevamente</Error>}
        {success == 'complete' && <Error>Llene todo el formulario</Error>}

        {item && mode && <Modal mode={mode} click={x} text={`Esta apunto de ${funcion} la cuenta de ${userDB.users[item].displayName ? userDB.users[item].displayName.toUpperCase() : 'UN SUSARIO SIN NOMBRE'}`}>

          {funcion == 'activar' && <Button click={active}>Activar</Button>}
          {funcion == 'desactivar' && <Button click={desactive}>Desactivar</Button>}
          {funcion == 'eliminar' && <Button click={remove}>Eliminar</Button>}
          {funcion == 'ASIGNAR EL ROL ADMIN a' && <Button style='buttonSuccess' click={asignar}>Asignar</Button>}
          {funcion == 'QUITAR EL ROL ADMIN de' && <Button style='buttonPrimary' click={quitar}>Quitar</Button>}
        </Modal>}

        <Particles />
      </div>
    </Layout>

  )
}

export default WithAuth(Admin) 
