"use client"
// AccessibilityWidget.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Paper, Button, Slider, Input } from '@mui/material';
import HTMLMagnifier from './html-magnifier'; // Assuming you have the HTMLMagnifier class in a separate file
import styles from './AccessibilityWidget.module.css';

interface AccessibilityWidgetProps {}

const AccessibilityWidget: React.FC<AccessibilityWidgetProps> = () => {

    const initialState = {
        fontSize: typeof window !== "undefined" ? (localStorage.getItem('fontSize') as 'small' | 'medium' | 'large') || 'small' : 'small',
        isInverted: typeof window !== "undefined" ? JSON.parse(localStorage.getItem('isInverted') || 'false') : false,
        contrast: typeof window !== "undefined" ? parseFloat(localStorage.getItem('contrast') || '100') : 100,
    };

    const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('small');
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isInverted, setIsInverted] = useState<boolean>(false);

    const [contrast, setContrast] = useState<number>(100);

    const magnifierRef = useRef<HTMLMagnifier | null>(null);

    // Other state and functions...
  
    const handleShowMagnifier = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnifierRef.current) {
        magnifierRef.current = new HTMLMagnifier({ zoom: 2, shape: 'circle', width: 200, height: 200 });
      }
      magnifierRef.current.show(event.nativeEvent);
    };

    const handleHideMagnifier = () => {
        if (magnifierRef.current) {
            magnifierRef.current.hide();
        }
    }
  
    useEffect(() => {
      return () => {
        if (magnifierRef.current) {
          magnifierRef.current.hide();
          magnifierRef.current = null;
        }
      };
    }, []);
    
    useEffect(() => {
        document.documentElement.style.filter = `invert(${isInverted ? 1 : 0}) contrast(${contrast}%)`;
        localStorage.setItem('isInverted', JSON.stringify(isInverted));
        localStorage.setItem('contrast', contrast.toString());
    }, [isInverted, contrast]);

    useEffect(() => {
        document.documentElement.style.fontSize =
        fontSize === 'small' ? '15px' : fontSize === 'large' ? '30px' : '25px';
        localStorage.setItem('fontSize', fontSize);
    }, [fontSize]);

    const handleInvertChange = () => {
        setIsInverted(!isInverted);
    };

    const handleFontSizeChange = (e: string) => {
        setFontSize(e as 'small' | 'medium' | 'large');
    };

    const handleContrastChange = (_event: Event, value: number | number[]) => {

        setContrast(value as number);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleContrastPreset = (presetValue: number) => {
        setContrast(presetValue);
    };

    const handleResetToDefault = () => {
        const defaultFontSize: 'small' | 'medium' | 'large' = 'small';
        const defaultIsInverted: boolean = false;
        const defaultContrast: number = 100;

        setFontSize(defaultFontSize);
        setIsInverted(defaultIsInverted);
        setContrast(defaultContrast);

        document.documentElement.style.filter = 'invert(0) contrast(100%)';
        fontSize === 'small' ? '15px' : fontSize === 'large' ? '30px' : '25px';

        localStorage.setItem('fontSize', defaultFontSize);
        localStorage.setItem('isInverted', JSON.stringify(defaultIsInverted));
        localStorage.setItem('contrast', defaultContrast.toString());
    };

    useEffect(() => {
        setFontSize(initialState.fontSize);
        setIsInverted(initialState.isInverted);
        setContrast(initialState.contrast);
    }, []);

    return (
        <div className={styles.accessibilityWidget}>
        <Button variant="contained" onClick={handleOpenModal}>
            Accessibility Options
        </Button>
        <Modal className={styles.centerScreen} open={isModalOpen} onClose={handleCloseModal} disableScrollLock>
            <Paper className={styles.modalContent}>
            <h2>Accessibility Options</h2>
            <div className={styles.accessibilityButtons}>
            <p>Magnification</p>
                <Button
                variant="contained"
                onClick={handleShowMagnifier}
                >
                    Show Magnifier
                </Button>
                <Button
                variant="contained"
                onClick={handleHideMagnifier}
                >
                    Hide Magnifier
                </Button>
                <p>Font Size</p>
                <Button
                variant="contained"
                style={{ backgroundColor: fontSize === 'small' ? '#1976D2' : 'black' }}
                onClick={() => handleFontSizeChange('small')}
                >
                100%
                </Button>
                <Button
                variant="contained"
                style={{ backgroundColor: fontSize === 'medium' ? '#1976D2' : 'black' }}
                onClick={() => handleFontSizeChange('medium')}
                >
                150%
                </Button>
                <Button
                variant="contained"
                style={{ backgroundColor: fontSize === 'large' ? '#1976D2' : 'black' }}
                onClick={() => handleFontSizeChange('large')}
                >
                200%
                </Button>

                <p>Color Inversion</p>
                <Button
                variant="contained"
                style={{ backgroundColor: isInverted ? '#1976D2' : 'black' }}
                onClick={handleInvertChange}
                >
                {isInverted ? 'On' : 'Off'}
                </Button>

                <p>Contrast (current value: {contrast})</p>
                <div>
                    <Button
                        variant="contained"
                        style={{
                        backgroundColor: contrast === 50 ? '#1976D2' : 'black',
                        }}
                        onClick={() => handleContrastPreset(50)}
                    >
                        50
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                        backgroundColor: contrast === 100 ? '#1976D2' : 'black',
                        }}
                        onClick={() => handleContrastPreset(100)}
                    >
                        100
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                        backgroundColor: contrast === 150 ? '#1976D2' : 'black',
                        }}
                        onClick={() => handleContrastPreset(150)}
                    >
                        150
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                        backgroundColor: contrast === 200 ? '#1976D2' : 'black',
                        }}
                        onClick={() => handleContrastPreset(200)}
                    >
                        200
                    </Button>
                </div>
                <Slider
                value={contrast}
                onChange={handleContrastChange}
                aria-labelledby="contrast-slider"
                valueLabelDisplay="auto"
                min={50}
                max={200}
                />

                {/* Reset to Default Button */}
                <Button variant="contained" onClick={handleResetToDefault}>
                Reset to Default
                </Button>
            </div>
            <Button variant="contained" onClick={handleCloseModal}>
                Close Modal
            </Button>
            </Paper>
        </Modal>
        </div>
    );
};

export default AccessibilityWidget;
