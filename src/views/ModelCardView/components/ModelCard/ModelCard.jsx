import React, { useState, useEffect, useRef } from 'react';
import styles from './ModelCard.module.scss';
import { getRandomBreedImage, fetchDogBreed } from "../../../../services/apiService";
import { Dialog, DialogTitle } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CircleSvg from './CircleSvg';

export default function ModelCard(props) {
    const textOverflowElement = useRef(null);

    const [image, setImage] = useState('');
    const [textOverflow, setTextOverflow] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const pickImage = async () => {
            //random selector to set dog pic
            if (Math.random() > 0.8) {
                setImage(await getRandomBreedImage(await fetchDogBreed()));
            } else {
                //api response did not return the model cards' image so here are static images from the website selected at random
                const imagesArray = ['https://console.alwaysai.co/static/img/model-catalog/ObjectDetection2.png', 'https://console.alwaysai.co/static/img/model-catalog/ObjectDetection4.png',
                    'https://console.alwaysai.co/static/img/model-catalog/ObjectDetection3.png'];
                //select random index between 0-2
                setImage(imagesArray[Math.floor(Math.random() * 3)]);
            }

        }
        pickImage();
        //need to render see more button depending on overflow of text
        setTextOverflow(checkIfOverflow());
    }, [])


    const renderLabels = (labels) => {
        if (labels && labels[0]) {
            return labels.map(label => `${label}, `)
        } else return "Unavailable"
    }

    const checkIfOverflow = () => {
        if (textOverflowElement.current.scrollHeight > textOverflowElement.current.clientHeight) {
            return true
        }
        return false
    }

    return (
        <div className={styles['wrapper']}>

            <div className={`${styles['main-image-container']} row`} style={{ backgroundImage: `url(${image})` }}>
                {props.purpose === 'PoseEstimation' && (
                    <div className={styles['pose-estimation']}>Pose Estimation</div>
                )}
                {props.purpose === 'ObjectDetection' && (
                    <div className={styles['object-detection']}>Object Detection</div>
                )}
                {props.purpose === 'Classification' && (
                    <div className={styles['classification']}>Classification</div>
                )}

            </div>





            <div className={styles['main-section']}>
                <div>
                    <div className="row">
                        <div className="col-md-8 mx-3 mx-md-0">
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <div className="d-flex align-items-baseline justify-content-start">
                                            <div className="title mt-2 mt-md-0">
                                                <span className={styles['title']}>{props.title}</span>
                                            </div>
                                            <div className="ml-3">
                                                <div className="jss1208">
                                                    <button className="MuiButtonBase-root MuiIconButton-root jss1208" tabIndex="0" type="button" aria-label="more" aria-controls="long-menu" aria-haspopup="true"><span className="MuiIconButton-label"><svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></span>
                                                        <span className="MuiTouchRipple-root"></span>
                                                    </button>
                                                </div></div></div></div>
                                </div></div><div className="row">
                                <div className="col">
                                    <div className={`${styles['truncate']} mb-3`}>{props.description}</div>
                                    <div className={styles['truncate']} ref={textOverflowElement}><span className="font-weight-bold">Labels:  </span>{renderLabels(props.labels)}</div>
                                    {textOverflow && (
                                        <>
                                            <button type="button" className={styles['see-more-button']} onClick={() => setOpenDialog(true)}>See more</button>
                                            <Dialog
                                                open={openDialog}
                                                maxWidth={'xl'}
                                                onBackdropClick={() => setOpenDialog(false)}
                                            >
                                                <div style={{ textAlign: 'right' }}>
                                                    <CloseIcon
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => setOpenDialog(false)} />
                                                </div>
                                                <DialogTitle>{props.title}</DialogTitle>
                                                <div>{renderLabels(props.labels)}</div>
                                            </Dialog>
                                        </>
                                    )}
                                </div></div></div>
                        <div className="col-md-4 d-flex flex-column align-items-center mx-0 mx-md-0 mt-3 mt-md-0">
                            <div className="sub-title">AVG. INFERENCE TIME</div>
                            <div className="outer-ring mt-3">
                                <div className="inner-ring d-flex flex-column justify-content-center align-items-center">
                                    <div className="text-align-center">{props.inference_time > 0 ? props.inference_time : 'N/A'}</div>
                                    {props.inference_time > 0 && (
                                        <div className="text-align-center" className={styles['inference-time-ms']}>ms</div>
                                    )}
                                </div>
                                <div className="inference-ring">
                                    {/* just a random formula for generating the green circle based on inference time */}
                                    <CircleSvg degree={props.inference_time > 300 ? 0 : 283 - (props.inference_time * 1.5)} />
                                </div></div><div className="d-flex justify-content-between mt-2 ring-footer" style={{ width: '55%' }}>
                                <div style={{ color: '#696969', fontSize: 12 }}>{props.size} MB</div>
                                <div style={{ color: '#696969', fontSize: 12 }}>V{props.version}</div></div></div></div><div className="row"><div className="col"></div></div>

                </div>
                <div className={styles['footer-wrapper']}>
                    <div className="divider"></div>
                    <div className={`${styles['footer']} row`}><div className="col-md-8 d-flex align-items-start justify-content-center justify-content-md-start">
                        <div className="item" style={{ width: '45%' }}>Framework: {props.framework}</div>
                        <div className="item ml-5">Data Set: {props.dataSet}</div>
                    </div><div className="col-md-4 d-none d-md-flex justify-content-center"><div className="use-this-model"><span>+ Use this Model</span></div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

