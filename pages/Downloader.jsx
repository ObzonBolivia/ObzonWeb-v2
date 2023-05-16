
import { useState, useEffect } from 'react'
import { generateUUID } from '../utils/UIDgenerator'
import { writeUserData } from '../firebase/utils'
import Button from '../components/Button'
import styles from '../styles/Downloader.module.css'
import Image from 'next/image'
import Layout from '../layout/Layout'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'

import { useRouter } from 'next/router'

import dynamic from "next/dynamic";

const InvoicePDF = dynamic(() => import("../components/pdfDoc"), {
  ssr: false,
});

function UuidController() {
  const { user, userDB, setUserSuccess, success, uuid, setUuid } = useUser()
  const router = useRouter()


  function generate() {
    let uuidGenerates = []
    for (let i = 0; i < 16; i++) {
      const newUuid = generateUUID()
      uuidGenerates.push(newUuid)
    }
    setUuid([...uuidGenerates])
  }

  function añadir() {
    console.log('anadiendo codes')
    const obj = uuid.reduce(function (target, key, index) {
      target[key] = false
      return target;
    }, {})
    return writeUserData('/activadores', obj, setUserSuccess)
  }


  function redirect() {
    const obj = uuid.reduce(function (target, key, index) {
      target[key] = false
      return target;
    }, {})
    router.push('/PDFdoc')
    return writeUserData('/activadores', obj, setUserSuccess)
  }
  useEffect(() => {

  }, []);

  const obj = new URLSearchParams(router.query)
  console.log(router.query.uuid)
//   console.log(Object.fromEntries(obj.get('uuid')))


  return (
    <Layout>

    
    
    
    <div className={styles.container}>

          {router.query.uuid

                ? <div style={{ color: 'white' }}>

          😍 El PDF se ha GENERADO exitosamente 😍

          <br />

          <br />

           {router.query.uuid && <InvoicePDF uuid={router.query.uuid.split(',')} />}

   
        </div>

         :<div style={{ color: 'white' }}>

          😍 El PDF se esta GENERANDO 😍

          <br />

          <br />

         

                  <div className={styles.spiner}>

    

                        <span></span>

                  </div>

    
             </div>}
  

        </div>
    
    
    
    


    </Layout>

  )
}

export default UuidController

















