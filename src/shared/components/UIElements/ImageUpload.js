import react, { useEffect, useRef,useState} from 'react';


import Button from './Button';

import './ImageUpload.css'; 


const ImageUpload = props =>{
    const [file,setFile] = useState();
    const [PreviewUrl,setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () =>{
            setPreviewUrl(fileReader.result)
        };
        fileReader.readAsDataURL(file);
    })

    const PickedHandler = event =>{
        let pickedFile;
        let fileIsValid = isValid;
        if(event.target.files && event.target.files.length ===1){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        }
        else{
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id,pickedFile,fileIsValid);
    }
   
    const pickImageHandler = () =>{
        filePickerRef.current.click();
    }

  return(
    <div className='form-control'>
      <input id={props.id} style={{display:'none'}} type="file" accept=".jpg,.png,.jpeg" ref={filePickerRef} onChange={PickedHandler}/>
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className='image-upload__preview'>
          {PreviewUrl && <img src={PreviewUrl} alt='preview'/>}
          {!PreviewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick ={pickImageHandler}> Pick Image </Button>
      </div>
      {!isValid && <p>{props.errorText}</p> }
    </div>
  );
}

export default ImageUpload;