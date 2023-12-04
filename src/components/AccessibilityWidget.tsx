"use client"
// AccessibilityWidget.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Paper, Button } from '@mui/material';
import styles from './AccessibilityWidget.module.css';

interface AccessibilityWidgetProps {}

const AccessibilityWidget: React.FC<AccessibilityWidgetProps> = () => {
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>(
    (localStorage.getItem('fontSize') as 'small' | 'medium' | 'large') || 'medium'
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.fontSize = fontSize === 'small' ? '15px' : fontSize === 'large' ? '30px' : '25px';
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  const handleFontSizeChange = (e: string) => {
    setFontSize(e as 'small' | 'medium' | 'large');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.accessibilityWidget}>
      <Button variant="contained" onClick={handleOpenModal}>
        Accessibility Options
      </Button>
      <Modal className={styles.centerScreen} open={isModalOpen} onClose={handleCloseModal} disableScrollLock>
        <Paper className={styles.modalContent}>
          <h2>Accessiblity Options</h2>
            <div className={styles.accessibilityButtons}>
                <p>Font Size</p>
                <Button variant="contained"
                style={{ backgroundColor: fontSize === 'small' ? '#1976D2' : 'black' }}
                onClick={() => handleFontSizeChange('small')}>
                100%
                </Button>
                <Button variant="contained"
                style={{ backgroundColor: fontSize === 'medium' ? '#1976D2' : 'black' }}
                onClick={() => handleFontSizeChange('medium')}
                >
                150%
                </Button>
                <Button variant="contained"
                style={{ backgroundColor: fontSize === 'large' ? '#1976D2' : 'black' }}
                onClick={() => handleFontSizeChange('large')}>
                200%
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
