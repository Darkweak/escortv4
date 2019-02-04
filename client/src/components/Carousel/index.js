import React from 'react';
import "./carousel.css";
import {Carousel as CarouselAddon} from 'react-responsive-carousel';

const images = [
  'http://www.angelio.net/blogangelio/wp-content/uploads/2018/08/application-rencontre-libido-810x400.jpg',
  'https://burst.shopifycdn.com/photos/nightclub-crowd-smoke-machine_4460x4460.jpg',
  'https://burst.shopifycdn.com/photos/man-adjusts-blue-tuxedo-bowtie_4460x4460.jpg',
  'https://burst.shopifycdn.com/photos/friends-taking-selfie_4460x4460.jpg',
]

export const Carousel = () => (
  <CarouselAddon
    autoPlay
    infiniteLoop
    showArrows
    showIndicators={false}
    showStatus={false}
    showThumbs={false}
  >
    {
      images.map((image, index) => (
        <div className={'carousel-images'} style={{backgroundImage: `url(${image})`}} key={index}/>
      ))
    }
  </CarouselAddon>
);
