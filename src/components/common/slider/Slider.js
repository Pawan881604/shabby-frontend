import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "./slider.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Box, CircularProgress, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { getSiteURL } from "lib/get-site-url";
import { Loadin_section } from "lib/Loadin_section";

export const Carousel = () => {
  const { loading, offer_slider } = useSelector((state) => state.offers);

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
            {loading ? (
              <Loadin_section />
            ) : (
              offer_slider &&
              offer_slider.filter(item=>item.status==='Active')
              .map((item, i) => (
                <SwiperSlide key={i}>
                  <Box
                    component="img"
                    alt={item.title}
                    src={`${getSiteURL()}${item.image && item.image.path}`}
                    sx={{
                      height: "400px",
                      width: "100%",
                      objectFit: "cover", 
                      objectPosition: "center", 
                    }}
                  />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </Box>
      </Container>
    </>
  );
};
