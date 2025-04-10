"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  { src: "/banners/spring-sale.jpg", alt: "Spring Sale Banner" },
  { src: "/banners/new-arrivals.jpg", alt: "New Arrivals" },
  { src: "/banners/essentials.jpg", alt: "Everyday Essentials" },
];

export function HeroCarousel() {
  return (
    <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
