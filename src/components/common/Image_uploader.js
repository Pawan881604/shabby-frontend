
import { Dropzone, FileMosaic } from "@dropzone-ui/react";
import { useState } from "react";

export const Image_uploader = ({setFiles}) => {
const [files,setimage]= useState([]);
    const updateFiles = (incommingFiles) => {
        setimage(incommingFiles)
      setFiles(incommingFiles[0].file);
    };
    return (
      <Dropzone onChange={updateFiles} value={files}   accept={ 'image/*'} 
      maxFiles={1}>
        {files.map((file) => (
          <FileMosaic {...file} preview />
        ))}
      </Dropzone>
    );
  }