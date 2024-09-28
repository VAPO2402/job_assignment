import React, { useEffect, useState } from "react";
import "../styles/home.css";
import Marquee from "react-fast-marquee";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null); // For storing user details
  const navigate = useNavigate();

  // Check if the user is logged in (check for access token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Fetch the user profile using the token
      axios
        .get("https://api.escuelajs.co/api/v1/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data); // Save user details in state
        })
        .catch((error) => {
          console.error("Failed to fetch user profile:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Clear token from localStorage
    setUser(null); // Reset user state
    navigate("/login"); // Redirect to login page
  };

  const slides = [
    {
      image: "https://staging.chatreal.ai/images/carousel1.webp",
      text: `Personalized AI Conversations Tailored AI Interactions 
      Our AI companion personalizes conversations to reflect your unique appearance and personality. Enjoy truly personalized interactions with an AI that adapts to you.`,
    },
    {
      image: "https://staging.chatreal.ai/images/carousel2.webp",
      text: "Explore Slide 2",
    },
    {
      image: "https://staging.chatreal.ai/images/carousel3.webp",
      text: "Discover Slide 3",
    },
    {
      image: "https://staging.chatreal.ai/images/carousel4.webp",
      text: "Uncover Slide 4",
    },
    {
      image: "https://staging.chatreal.ai/images/carousel5.webp",
      text: "Enjoy Slide 5",
    },
  ];

  return (
    <>
      <div className="landingPage">
        <video className="videoMain" autoPlay loop muted>
          <source
            src="https://staging.chatreal.ai/videos/opening.m4v"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="header">
          <div className="logoHeader">
            <img src="https://staging.chatreal.ai/images/logo.png" alt="logo" />
          </div>
          {user ? (
            <div className="userSection">
              <img src={user.avatar} alt="User Avatar" className="userAvatar" />
              <button className="logoutButton" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="login">
              <Link to={"/login"}>Login</Link>
            </button>
          )}
        </div>
        <div className="landingContent">
          <div className="content">
            <h1>
              <span>Real Emotions, Real Connections </span>
              <br />
              Meet Your AI Companion Today
            </h1>
            <p>
              Engage with real AI companions offering human-like interactions,
              <br /> powered by cutting-edge AI technology. Chat with AI
              girlfriends <br /> and companions for conversations that feel
              truly authentic and <br /> secure.
            </p>
          </div>
          <button className="chat">Start Chatting</button>
        </div>

        <div className="landingMarquee">
          <Marquee
            style={{
              backgroundColor: "black",
              color: "yellow",
              padding: "10px", // Optional padding for better appearance
            }}
          >
            Get ChatReal.ai free until October 31, 2024! Don't miss out!
          </Marquee>
        </div>
      </div>
      <div className="carouselMain">
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          showStatus={false}
          showArrows={true}
          stopOnHover={false}
          className="carousel"
        >
          {slides.map((slide, index) => (
            <div key={index} className="carouselInner">
              <div className="carouselText">
                <h2 className="textH1">{slide.text}</h2>
              </div>
              <div
                className="carouselImage"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              ></div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Home;