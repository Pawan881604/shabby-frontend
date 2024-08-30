import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "./slider.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Box, Container } from "@mui/material";

export const Carousel = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <Swiper
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
            }}
            speed={600}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]} // Remove Parallax since it's not used
            className="mySwiper"
          >
            <SwiperSlide>
              <Box
                component="img"
                alt="Widgets"
                src="/assets/Easter - Offers - Discounts - Promotions - Banner - Paisagem.jpg"
                sx={{ height: "auto", width: "100%" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Box
                component="img"
                alt="Widgets"
                src="/assets/White Blue Simple Special Offer Sale Banner Landscape.jpg"
                sx={{ height: "auto", width: "100%" }}
              />
            </SwiperSlide>
          </Swiper>
        </Box>
      </Container>
    </>
  );
};
