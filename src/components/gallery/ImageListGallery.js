import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleChevronLeft,
    faCircleChevronRight,
    faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

import './gallery.css';
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";

export default function ImageListGallery({galleryImages}){
    const [slideNumber, setSlideNumber] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const handleOpenModal = (index) => {
        setSlideNumber(index)
        setOpenModal(true)
    }
    // Close Modal
    const handleCloseModal = () => {
        setOpenModal(false)
    }
    // Previous Image
    const prevSlide = () => {
        slideNumber === 0
            ? setSlideNumber( galleryImages.length -1 )
            : setSlideNumber( slideNumber - 1 )
    }
    // Next Image
    const nextSlide = () => {
        slideNumber + 1 === galleryImages.length
            ? setSlideNumber(0)
            : setSlideNumber(slideNumber + 1)
    }
    return (
        <div className={"p-0 m-0"}>
            {openModal &&
                <div className='sliderWrap'>
                    <FontAwesomeIcon icon={faCircleXmark} className='btnClose' onClick={handleCloseModal}  />
                    <FontAwesomeIcon icon={faCircleChevronLeft} className='btnPrev' onClick={prevSlide} />
                    <FontAwesomeIcon icon={faCircleChevronRight} className='btnNext' onClick={nextSlide} />
                    <div className='fullScreenImage'>
                        <img src={galleryImages[slideNumber].image} alt='' />
                    </div>
                </div>
            }
            <ImageList sx={{ width: "100%", height: 450 }} cols={4} rowHeight={160}>
                {
                    galleryImages && galleryImages.map((item, index) => (
                        <>
                            <ImageListItem key={item.image} className={""}>
                                <img
                                    src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.image}
                                    loading="lazy"
                                    onClick={ () => handleOpenModal(index) }
                                />
                            </ImageListItem>
                        </>
                ))}
            </ImageList>
        </div>
    )
}
