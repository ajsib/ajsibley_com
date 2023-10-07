import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useCallback } from "react";

// Styled components
const HeaderContainer = styled.div<{ scrolled: boolean; showHeader: boolean }>`
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 99;
background-color: #ffffff;
transition: all 0.3s ease;
box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
height: ${(props) => (props.scrolled ? "60px" : "100px")};
opacity: ${(props) => (props.showHeader ? "1" : "0")};
border-radius: 0 0 7px 7px; /* Rounded bottom corners by 7 pixels */
}
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column; /* Changed to a column layout */
  align-items: center; /* Centered vertically */
  padding: 0 20px;
  height: 100%;
`;

const StyledText = styled.div`
  font-family: 'Georgia', serif;
  margin: 20px 0;
  text-align: center;
`;

const RegularGreeting = styled(StyledText)`
  font-size: 23px;
  font-weight: bold;
  color: #333;
  margin: 15px 0;
  text-align: center;
`;

const SimplifiedContainer = styled(StyledText)`
  font-size: 14px;
  color: #777;
  margin: 0px 0;
  text-align: center;
  line-height: 1.4;
`;

const WelcomeHeadline = styled.h1`
  font-size: 23px;
  font-weight: bold;
  color: #333;
  margin: 15px 0;
  text-align: center;
`;

// Main component
const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const scrolled = scrollTop > 10;
    setScrolled(scrolled);

    // Determine whether the user is scrolling up or down
    setShowHeader(scrollTop <= 10 || scrollTop < lastScrollTop);

    // Save the last scroll position
    setLastScrollTop(scrollTop);
  }, [lastScrollTop]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, handleScroll]);

  return (
    <HeaderContainer scrolled={scrolled} showHeader={showHeader}>
      <HeaderContent>
        {scrolled ? (
          <WelcomeHeadline>Headline</WelcomeHeadline>
        ) : (
          <>
            <RegularGreeting>Headline</RegularGreeting>
            <SimplifiedContainer>Headlines, Hooks, and Heartfelt Stories</SimplifiedContainer>
          </>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
