import { useState } from 'react';
import { add, image, closeBlack } from '../../assets/Icons/index.js';
import { Red_btn, Spacer_bottom, White_btn } from '../index.js';
import style from './add_image.module.css';

function getBase64FromImage(imageFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function saveImageToLocalStorage(imageFile) {
    try {
        const base64Image = await getBase64FromImage(imageFile);
        localStorage.setItem('image', base64Image);
        console.log('Image saved to localStorage.');
    } catch (error) {
        console.error('Error saving image to localStorage:', error);
    }
}

function Add_image(){
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && isFileAllowed(file)) {
            setSelectedImage(file);
        } else {
            // if user tries to upload a wrong type of image we tell them they are stupid
            alert('Please select a PNG or JPEG image.');
        }
    };
    const isFileAllowed = (file) => {
        // check the file type of the uploaded file
        const fileType = file.type;
        //  is it PNG or JPEG?
        return fileType === 'image/png' || fileType === 'image/jpeg';
    };

    const handleUpload = () => {
        // if a image is uploaded
        if (selectedImage) {
            console.log('Selected image:', selectedImage); //debugging
            
            //save the image to localstorage instead of session since local allows for bigger data sizes. First convert it into Base64 format
            saveImageToLocalStorage(selectedImage);
        } else {
            console.log('No image selected.');
        }
        // after the upload we clode the popup
        setShowPopup(false);
        // set the state to null to "reset" it
        setSelectedImage(null);
    };

    return (
        <>
            <White_btn className={style.image_icon} onClick={() => setShowPopup(true)}>
                <img src={add} alt="add Icon" />
                <img src={image} alt="image icon small" />
            </White_btn>
            {showPopup && (
                <div className={style.popup} onClick={(e) => e.stopPropagation()}>
                    <div className={style.header_pop}>
                        <div className={style.header_txt}>
                            <h2 className={style.head}>Add a picture to your profile</h2>
                            <h3 className={style.sub_head}>(This will be visible to other users)</h3>
                        </div>
                        <div className={style.close_btn}>
                            <img src={closeBlack} onClick={() => setShowPopup(false)} />
                        </div>
                    </div>
                    <hr className={style.ruler} />

                    <div className={style.upload_container}>
                        <div className={style.file_wrapper}>
                            <h2 className={style.upload_txt_file}>Upload image</h2>
                            <div className={style.upload_input_wrapper}>
                                <img src={image} />
                                <label htmlFor="file-upload" className={style.custom_button}>Add image</label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageChange}
                                    className={style.upload_input}
                                />
                            </div>
                        </div>

                        <div className={style.image_render_area}>
                            {selectedImage && (
                                <div className={style.preview}>
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Preview"
                                        className={style.image_preview}
                                        style={{ maxWidth: '10rem', maxHeight: '10rem' }} //set boundrys on how large te uploaded image is rendered
                                    />
                                </div>
                            )}
                        </div>

                        <div className={style.btn_bag}>
                            <Red_btn onClick={handleUpload} className={style.upload_button}>
                                Confirm Image
                            </Red_btn>
                        
                            <White_btn onClick={() => {
                                setSelectedImage(null); 
                                setShowPopup(false); 
                                }} className={style.close_button}
                            >
                                Skip
                            </White_btn>
                        </div>

                        <Spacer_bottom />
                    </div>

                    <Spacer_bottom />
                    
                </div>
            )}
        </>
    );
}


export default Add_image