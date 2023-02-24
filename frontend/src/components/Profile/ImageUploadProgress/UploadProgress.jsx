import React, { useEffect } from 'react'
import { useUploadImages } from '../../../hooks/useUploadImage'

const UploadProgress = ({ images, setClose, cb }) => {

    const { url, error } = useUploadImages([...images])

    useEffect(() => {
        console.log(url)

        if (images.length === url.length) {
            console.log("finisedh " ,url)
            setClose()
            cb(url[0])
        }
    }, [url])


    return (
        <div></div>
    )
}

export default UploadProgress