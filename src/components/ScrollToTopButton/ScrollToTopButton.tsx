import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 300);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <Fab
            color="primary"
            aria-label="scroll-to-top"
            onClick={handleScrollToTop}
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                visibility: isVisible ? 'visible' : 'hidden',
                opacity: isVisible ? 1 : 0,
                transition: 'visibility 0s, opacity 0.5s linear'
            }}
        >
            <KeyboardArrowUpIcon />
        </Fab>
    );
}
