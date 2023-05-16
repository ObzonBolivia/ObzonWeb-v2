import { getCode, getImageData } from '../firebase/utils'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context'
import Particles from '../components/Particles'

import { WithAuth } from '../HOCs/WithAuth'
import Layout from '../layout/Layout'
import Error from '../components/Error'
import Figure from '../components/Figure'

import Success from '../components/Success'

import Modal from '../components/Modal'
import Button from '../components/Button'
import QRCode from "qrcode.react";
import Link from 'next/link'
import { PDFDownloadLink } from "@react-pdf/renderer";

import style from '../styles/Home.module.css'
import dynamic from "next/dynamic";

const InvoicePDF = dynamic(() => import("../components/pdf"), {
  ssr: false,
});

function Home() {
  const { user, userDB, setUserProfile, setAlbunImage, qr, setQr, setDataUrl, setUserSuccess, success, setUserData, pageOne, pageTwo, pageThree, handlerPageView, numeration, image, dataUrl } = useUser()
  const router = useRouter()

  const [mode, setMode] = useState(false)

  const [arr, setArr] = useState([1, 2, 3])
  const [pluss, setPluss] = useState(false)


  const [opacity, setOpacity] = useState(false);



  function nextClick(e) {
    e.preventDefault()
    if (!navigator.onLine) {
      setUserSuccess('NoInternet')
      return
    }
    const code = e.target.form[0].value
    console.log(code)
    getCode(code, user.uid, setUserSuccess)
  }

  function backClick(e) {
    e.preventDefault()
    router.p()
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

  function remove(id) {
    const newArr = arr.filter(i => i !== id)
    console.log(newArr)
    setArr(newArr)
  }

  function remove(data) {
    handlerPageView(data)
  }
  function removeQR() {
    setQr(!qr)
  }



  function handlerPDF() {


    setUserSuccess('RequireCodeActivation')

  }
  function x() {
    setMode(!mode)
  }



  const handlerQRUrl = (e) => {
    const qr = e.target.value
    setQr(qr)

  };





  useEffect(() => {

    

   Object.keys(image).length == 0 && getImageData(`/usersCollage/${user.uid}/image`, setAlbunImage)

  dataUrl == '' &&  getImageData(`/usersCollage/${user.uid}/dataUrl`, setDataUrl)
    
    
    document.getElementById('qr') && setDataUrl(document.getElementById('qr').toDataURL())
  }, [user, qr]);



  return (
    <Layout >
      <div className={style.container}>

        <button className={`${style.activator}`} onClick={x}> {userDB.users && userDB.users[user.uid] && userDB.users[user.uid].uid ? 'Eres Premium' : 'Activar cuenta'}</button>

        <div className={style.grid}>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[0]} num={1} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[1]} num={2} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[2]} num={3} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[3]} num={4} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[4]} num={5} ></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[5]} num={6} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[6]} num={7} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[7]} num={8} ></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[8]} num={9} rotate={style.figureOneIMGRotate}></Figure>

          <div className={style.separator}></div>

          <Figure stylesProp={style.figureOne} url='#' index={numeration[9]} num={10} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[10]} num={11} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[11]} num={12} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[12]} num={13} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[13]} num={14} ></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[14]} num={15} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[15]} num={16} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[16]} num={17} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[17]} num={18} rotate={style.figureOneIMGRotate}></Figure>

          <div className={style.separator}></div>

          <Figure stylesProp={style.figureOne} url='#' index={numeration[18]} num={19} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[19]} num={24} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[20]} num={25} ></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[21]} num={26} ></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[22]} num={29} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[23]} num={30} rotate={style.figureOneIMGRotate}></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[24]} num={31} ></Figure>
          <Figure stylesProp={style.figureTwo} url='#' index={numeration[25]} num={32} rotate={style.figureTwoIMGRotate}></Figure>
          <Figure stylesProp={style.figureTwo} url='#' index={numeration[26]} num={33} rotate={style.figureTwoIMGRotate}></Figure>

          <div className={style.separator}></div>

          <Figure stylesProp={style.figureOne} url='#' index={numeration[27]} num={34} ></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[28]} num={35} ></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[29]} num={36} ></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[30]} num={37} ></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[31]} num={38} ></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[32]} num={41} ></Figure>
          <Figure stylesProp={style.figureOne} url='#' index={numeration[33]} num={42} ></Figure>

          <div className={style.qr}>
            <QRCode
              id='qr'
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%", border: 'none', backgroundColor: 'red' }}
              value={qr}
              level={'H'}
              includeMargin={false}
              renderAs={'canvas'}
              viewBox={`0 0 256 256`}
            />
            <input className={style.inputQR} onChange={handlerQRUrl} type="text" placeholder='Ingresar URL' />
          </div>
          <div className={style.void}></div>

          <div className={style.separator}></div>

          <Figure stylesProp={style.figureThree} url='#' index={numeration[34]} num={39} ></Figure>
          <Figure stylesProp={style.figureFour} url='#' index={numeration[35]} num={43} rotate={style.figureFourIMGRotate}></Figure>
          <Figure stylesProp={style.figureFive} url='#' index={numeration[36]} num={45} ></Figure>
        </div>

        {/* <button className={`${style.pluss}`} onClick={handlerPDF}>pdf</button> */}
        <InvoicePDF style={style.pluss} click={handlerPDF} dbUrl={dataUrl} img={image} />

        {userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].uid

          ? <InvoicePDF style={style.pluss} click={handlerPDF} dbUrl={dataUrl} img={image} />


          : <button onClick={handlerPDF} className={style.pluss} >pdf</button>}





        {success == 'NonExist' && <Error>ERROR: codigo no existente</Error>}
        {success == 'InUse' && <Error>ERROR: codigo en uso</Error>}
        {success == 'Premium' && <Success>Felicidades, ERES PREMIUM !!</Success>}
        {success == 'RequireCodeActivation' && <Error>Debes Activar Tu Cuenta</Error>}


        <Particles />
      </div>


      <Modal mode={mode} click={x} text={userDB.users && userDB.users[user.uid] && userDB.users[user.uid].uid ? 'Felicidades Eres Premium' : 'Ingresa tu codigo de activación'}>
        <form className={style.formActive}>

          {userDB.users && userDB.users[user.uid] && userDB.users[user.uid].uid
            ? <p className={style.codeActive}>   {userDB.users[user.uid].uid}     </p>


            : <input className={style.inputActive} type="text" placeholder='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' />
          }
          <div className={style.buttonsContainer}>
            {userDB.users && userDB.users[user.uid] && userDB.users[user.uid].uid ? '' : <Button style='buttonPrimary' click={nextClick}>Continuar</Button>}
          </div>

          {userDB.users && userDB.users[user.uid] && userDB.users[user.uid].uid
            ? <Link href='https://api.whatsapp.com/send?phone=+59168033785&text=Hola%20OBZON,%20necesito%20Soporte%20con%20la%20app...' legacyBehavior>
              <a target='_blank' className={style.whatsAppLink} >Soporte OBZON</a>
            </Link>
            : <Link href='https://api.whatsapp.com/send?phone=+59168033785&text=Hola%20OBZON,%20necesito%20un%20c%C3%B3digo%20de%20ACTIVACI%C3%93N%20para%20la%20app...' legacyBehavior>
              <a target='_blank' className={style.whatsAppLink} >Solicitar un codigo de ACTIVACIÓN</a>
            </Link>}
        </form>
      </Modal>

    </Layout>
  )
}

export default WithAuth(Home)

