"use client"
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const ImageInput = () => {
    
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
      const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
          const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
          setSelectedImages((prevImages) => [...prevImages, ...newImages]);
        }
      };
      
      const handleRemoveImage = (imageUrl: string) => {
        URL.revokeObjectURL(imageUrl);  
        setSelectedImages((prevImages) => prevImages.filter((img) => img !== imageUrl));
      };

  return (
    <label className="myFile edit-view m-5 block text-2xl text-white" htmlFor="file_input">
    <p className="cursor-pointer"> 
    <FontAwesomeIcon 
      icon={faImage}
      />
      </p>
       
    <div className="flex"> 
      <input
    className="block top-0 right-0 opacity-0 absolute p-2 text-text font-bold border border-gray-300 rounded-lg cursor-pointer focus:outline-none dark:placeholder-gray-400"
    id=""
    type="file"
    name='files'
    multiple 
    accept="image/*,video/*"
    //  onChange={handleImageUpload}
    /> 
    </div>
    </label>
  )
}

export default ImageInput
