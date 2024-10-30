import React, { useEffect, useState } from 'react'
import { RxDotFilled } from "react-icons/rx";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import pic1 from "../asset/Images/picture1.png"
import pic2 from "../asset/Images/Picture2.png"
import pic3 from "../asset/Images/Picture3.png"

function Slider() {
    const slides = [
      {
        url: pic1,
      },
      {
        url: pic2,
      },
      {
        url: pic3,
      },
    ];
  
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const prevSlide = () => {
      const newIndex = (currentIndex + slides.length - 1) % slides.length;
      setCurrentIndex(newIndex);
    };
  
    const nextSlide = () => {
      const newIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(newIndex);
    };
  
    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };
  
    const dotColor = (slideIndex) => {
      const color = slideIndex === currentIndex ? '#000000' : '#808080';
      return color;
    };
  
    const content = [
      {
        title: 'Title 1',
        desc:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius earum ea numquam dolor culpa facere reprehenderit qui quaerat, aliquam porro aperiam quidem exercitationem in, dolores perferendis excepturi possimus veniam, laboriosam nam a explicabo animi quas eligendi! Minus vero laudantium debitis similique veniam, nam accusantium expedita quasi corrupti. Fugit, quos labore!',
      },
      {
        title: 'Title 2',
        desc:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius earum ea numquam dolor culpa facere reprehenderit qui quaerat, aliquam porro aperiam quidem exercitationem in, dolores perferendis excepturi possimus veniam, laboriosam nam a explicabo animi quas eligendi! Minus vero laudantium debitis similique veniam, nam accusantium expedita quasi corrupti. Fugit, quos labore!',
      },
      {
        title: 'Title 3',
        desc:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius earum ea numquam dolor culpa facere reprehenderit qui quaerat, aliquam porro aperiam quidem exercitationem in, dolores perferendis excepturi possimus veniam, laboriosam nam a explicabo animi quas eligendi! Minus vero laudantium debitis similique veniam, nam accusantium expedita quasi corrupti. Fugit, quos labore!',
      },
      {
        title: 'Title 4',
        desc:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius earum ea numquam dolor culpa facere reprehenderit qui quaerat, aliquam porro aperiam quidem exercitationem in, dolores perferendis excepturi possimus veniam, laboriosam nam a explicabo animi quas eligendi! Minus vero laudantium debitis similique veniam, nam accusantium expedita quasi corrupti. Fugit, quos labore!',
      },
      {
        title: 'Title 5',
        desc:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius earum ea numquam dolor culpa facere reprehenderit qui quaerat, aliquam porro aperiam quidem exercitationem in, dolores perferendis excepturi possimus veniam, laboriosam nam a explicabo animi quas eligendi! Minus vero laudantium debitis similique veniam, nam accusantium expedita quasi corrupti. Fugit, quos labore!',
      },
    ];
  
    return (
      <div className="2xl:px-0 pb-6 py-24">
        <div className="maxw-[800px] h-[500px] sm:h-[700px] lg:h-[700px] xl:px-20 w-auto m-auto py-5 xl:h-[800px] px-5 relative group ease-out">
          <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className="w-full h-full rounded-2xl bg-cover bg-no-repeat bg-center ease-in-out duration-700"
          >
            <div
              src={slides[currentIndex].url}
              className="w-full h-full rounded-2xl bg-cover bg-no-repeat bg-center duration-500"
            />
            <div className="flex flex-col absolute w-[450px] lg:top-[280px] left-5 lg:left-32">
              <h1 className="hidden lg:block font-roboto font-bold text-[50px] mb-5 text-white">
                {content[currentIndex]?.title}
              </h1>
              <p className="hidden lg:block font-roboto text-[15px] font-semiboldbold mb-5 text-white">
                {content[currentIndex]?.desc}
              </p>
            </div>
            <div className="hidden xl:flex absolute space-x-5 top-[300px] right-5">
              {slides
                .concat(slides)
                .concat(slides)
                .slice(currentIndex + 1, currentIndex + 4)
                .map((slide, imgIndex) => {
                  const adjustedIndex = currentIndex + imgIndex + 1;
                  return (
                    <div
                      className="relative hover:scale-[1.05] ease-in-out duration-200"
                      key={adjustedIndex}
                    >
                      <img
                        src={slide.url}
                        alt={`Slide ${adjustedIndex}`}
                        className="card xl:max-w-[220px] xl:h-[230px] 2xl:max-w-[300px] 2xl:h-[280px] rounded-[15px] drop-shadow-lg shadow-[#353935] shadow-2xl"
                      />
                      <div className="absolute inset-0 rounded-[15px]"></div>
                    </div>
                  );
                })}
            </div>
            <div className="absolute bottom-16 left-[45%] p-1 space-x-5">
              <button
                onClick={nextSlide}
                className="text-2xl bg-l-black p-2 rounded-xl cursor-pointer hover:scale-110 duration-200 ease-in-out outline-none"
              >
                <AiOutlineArrowLeft className="text-eee text-lg" />
              </button>
              <button
                onClick={prevSlide}
                className="text-2xl bg-l-black p-2 rounded-xl cursor-pointer hover:scale-110 duration-200 ease-in-out outline-none"
              >
                <AiOutlineArrowRight className="text-eee text-lg" />
              </button>
            </div>
            <div className="flex top-4 justify-center py-2">
              {slides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className="text-2xl cursor-pointer"
                >
                  <RxDotFilled
                    style={{ color: `${dotColor(slideIndex)}` }}
                    className="hover:text-l-black"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Slider;
  