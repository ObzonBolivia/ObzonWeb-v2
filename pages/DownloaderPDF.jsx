import { getImageData } from '../firebase/utils'
import { useUser } from "../context/Context.js"

import styles from '../styles/Downloader.module.css'
import Layout from '../layout/Layout'
import { useEffect, useState, useRef } from 'react'

import { useRouter } from 'next/router'

import dynamic from "next/dynamic";

const InvoicePDF = dynamic(() => import("../components/pdf"), {
  ssr: false,
});

function UuidController() {


  const { userImage, setUserImage, dataUrl, setDataUrl } = useUser()

  const router = useRouter()
  const [mode, setMode] = useState({})



  useEffect(() => {
    getImageData(`/usersCollage/${router.query.uid}/image`, setUserImage)
    getImageData(`/usersCollage/${router.query.uid}/dataUrl`, setDataUrl)

  }, [router.query]);

  console.log(userImage)
  return (

    <Layout>

      <div className={styles.container}>
        {Object.keys(userImage).length > 0
          ? <div style={{ color: 'white' }}>

            😍 El PDF se ha GENERADO exitosamente 😍

            <br />

            <br />

            <InvoicePDF img={userImage} dbUrl={dataUrl} />

          </div>
          : <div style={{ color: 'white' }}>

            😍 El PDF se esta GENERANDO 😍

            <br />

            <br />



            <div className={styles.spiner}>



              <span></span>

            </div>









          </div>

        }
      </div>
    </Layout>

  )
}

export default UuidController
