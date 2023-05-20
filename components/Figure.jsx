import { useUser } from '../context/Context'

import { useState, useRef, useEffect } from 'react'

import style from '../styles/Figure.module.css'

export default function Figure({ stylesProp, num, rotate, index }) {

    const { numeration, setAlbunNumeration, templates, qr, setQr, image, setAlbunImage, dataUrl, setDataUrl } = useUser()

    const dragItem = useRef();

    const dragOverItem = useRef();

    function handlerOnChange(e) {

        e.preventDefault()

        const fileName = e.target.name

        const file = e.target.files[0]

        var reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function () {

            setAlbunImage({ ...image, [fileName]: { ...image[fileName], file, url: reader.result, rotate: 0, position: 'center' } })

        };

        setAlbunImage({ ...image, [fileName]: { ...image[fileName], file, url: URL.createObjectURL(file), rotate: 0, position: 'center' } })

    }

    function handlerEventOnChange(e) {

        const fileName = e.target.name

        const value = e.target.value

        setAlbunImage({ ...image, [fileName]: { ...image[fileName], position: value, rotate: 0 } })

        console.log(e.target.value)

    }
        

    function handleDragStart(e, index) {

        //   console.log('start' + index)

        dragItem.current = index;

    }

    const handleDragEnter = (e, index) => {

        //  console.log('enter' + index)

        dragOverItem.current = index;

    };

    const handleDragEnd = (e, index) => {

        if (dragOverItem.current !== undefined) {

            const copyListItems = [...numeration];

            [copyListItems[dragItem.current], copyListItems[dragOverItem.current]] = [copyListItems[dragOverItem.current], copyListItems[dragItem.current]]

            setAlbunNumeration(copyListItems);

            dragItem.current = null;

            dragOverItem.current = null;

        }

    };

    function handlerEventOnClick(e, fileName, data) {

        if (data == 'top') {

            setAlbunImage({...image,  [fileName]: { ...image[fileName], position: image[fileName].position == 'center' ? '51% 50%' : `${image[fileName].position.replace('%', '').split(' ')[0] * 1 + 1}% ${image[fileName].position.replace('%', '').split(' ')[1]}` } })

        }

        if (data == 'right') {

            setAlbunImage({...image,  [fileName]: { ...image[fileName], position: image[fileName].position == 'center' ? '50% 51%' : `${image[fileName].position.split(' ')[0]} ${image[fileName].position.replaceAll('%', '').split(' ')[1] * 1 + 1}%` } })

        }

        if (data == 'bottom') {

            setAlbunImage({...image,  [fileName]: { ...image[fileName], position: image[fileName].position == 'center' ? '49% 50%' : `${image[fileName].position.replace('%', '').split(' ')[0] * 1 - 1}% ${image[fileName].position.replace('%', '').split(' ')[1]}` } })

        }

        if (data == 'left') {

            setAlbunImage({...image,  [fileName]: { ...image[fileName], position: image[fileName].position == 'center' ? '50% 49%' : `${image[fileName].position.split(' ')[0]} ${image[fileName].position.replaceAll('%', '').split(' ')[1] * 1 - 1}%` } })

        }

    }

    return (

        <div className={stylesProp}

            draggable

            onDragStart={(e) => handleDragStart(e, index)}

            onDragEnter={(e) => handleDragEnter(e, index)}

            onDragEnd={handleDragEnd}>

            {num !== 39 && num !== 43 && num !== 45 && <span className={rotate ? style.heartRotate : style.heart} >{num}</span>}

            {num === 39 && <div className={style.container39}>

                <div>

                    <span className={rotate ? style.heartRotate : style.heart} >22</span>

                </div>

                <div>

                    <span className={rotate ? style.heartRotate : style.heart} >20</span>

                </div>

                <div>

                    <span className={rotate ? style.heartRotate : style.heart} >23</span>

                </div>

                <div>

                    <span className={rotate ? style.heartRotate : style.heart} >21</span>

                </div>

            </div>

            }

            {num === 43 && <div className={style.container43}>

                <div>

                    <span className={rotate ? style.heartRotate : style.heart} >27</span>

                </div>

                <div>

                    <span className={rotate ? style.heartRotate : style.heart} >28</span>

                </div>

            </div>}

            {num === 45 && <div className={style.container43}>

                <div>

                    <span className={rotate ? style.heartRotate : style.heart} >39</span>

                </div>

                <div>

                    <span className={rotate ? style.heartRotate : style.heart} >40</span>

                </div>

            </div>}

            {num !== 39 && num !== 43 && num !== 45 && <label htmlFor={index} className={style.labelFileFigure}  >Cargar IMG {num}</label>}

            {num === 43 && <label htmlFor={index} className={style.labelFileFigureAbsolute}  >Cargar IMG 27-28</label>}

            {num === 45 && <label htmlFor={index} className={style.labelFileFigureAbsolute}  >Cargar IMG 39-40</label>}

            {num === 39 && <label htmlFor={index} className={style.labelFileFigureAbsolute}  >Cargar IMG 22-20-23-21</label>}

            <input type="file" id={index} name={`Image-${index}`} className={style.inputFileFigure} onChange={handlerOnChange} accept='.jpg, .jpeg, .png' />

            {image[`Image-${index}`] && image[`Image-${index}`].url && <img

                src={image[`Image-${index}`].url}

                className={rotate ? `${rotate}` : `${style.image}`}

                style={{ objectPosition: image[`Image-${index}`].position }} alt="" />}

            {rotate ?

                image[`Image-${index}`] && image[`Image-${index}`].url && <div className={style.radioInputs}>

                    <span onClick={(e) => handlerEventOnClick(e, `Image-${index}`, 'top')}></span>

                    <span onClick={(e) => handlerEventOnClick(e, `Image-${index}`, 'left')}></span>

                    <span onClick={(e) => handlerEventOnClick(e, `Image-${index}`, 'bottom')}></span>

                    <span onClick={(e) => handlerEventOnClick(e, `Image-${index}`, 'right')}></span>

                </div>

                :

                image[`Image-${index}`] && image[`Image-${index}`].url && <div className={style.radioInputs}>

                    <span onClick={(e) => handlerEventOnClick(e, `Image-${index}`, 'left')}></span>

                    <span onClick={(e) => handlerEventOnClick(e, `Image-${index}`, 'top')}></span>

                    <span onClick={(e) => handlerEventOnClick(e, `Image-${index}`, 'right')}></span>

                    <span onClick={(e) => handlerEventOnClick(e, `Image-${index}`, 'bottom')}></span>

                </div>}

        </div >

    )

}




