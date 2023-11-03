import {
  Box,
  Divider,
  IconButton,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import React from 'react';
import './Reading.scss';
import { Pause, PlayArrow, Stop, VolumeDown, VolumeUp } from '@mui/icons-material';
import { mainColor } from '../../utils/constants';

const Reading = () => {
  const speedSelection = [0.5, 0.75, 1, 1.5, 2];
  const [inputText, setInputText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(100);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    if (isPaused) {
      speechSynthesis.pause();
    } else {
      speechSynthesis.resume();
    }
  }, [isPaused]);

  const handleChangeVolume = (event, newValue) => {
    setVolume(newValue);
  };

  const playText = () => {
    var msg = new SpeechSynthesisUtterance();
    msg.volume = volume / 100; // âm lượng (0 - 1)
    msg.rate = rate; // tốc độ nói (0.1 - 10)
    msg.pitch = 2; // độ cao (0 - 2)
    msg.lang = 'en-GB'; // set ngôn ngữ
    msg.text = inputText; // nội dung
    msg.onstart = () => setIsPlaying(true);
    msg.onpause = () => setIsPaused(true);
    msg.onresume = () => setIsPaused(false);
    msg.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    speechSynthesis.speak(msg);
  };

  const handlePlay = () => {
    if (isPlaying && !isPaused) {
      setIsPaused(true);
    } else if (isPlaying && isPaused) {
      setIsPaused(false);
    } else {
      setIsPlaying(true);
      setIsPaused(false);
      playText();
    }
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleChangeRate = (event, newRate) => {
    setRate(newRate);
  };
  return (
    <div className="reading">
      <Typography variant="h4" color="primary" sx={{ textAlign: 'center', marginBottom: 3 }}>
        SPEAKING OUT
      </Typography>
      <TextField
        fullWidth
        type={'text'}
        placeholder="Enter your text"
        variant="outlined"
        multiline
        rows={5}
        name="text"
        onChange={(e) => setInputText(e.target.value)}
        sx={{ backgroundColor: 'white' }}
      ></TextField>
      <Divider sx={{ marginY: 2 }} />
      <Stack direction="row" spacing={4} alignItems="center" justifyContent="center">
        <IconButton onClick={handlePlay} sx={{ color: 'white', backgroundColor: mainColor }}>
          {isPlaying && !isPaused ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={handleStop} sx={{ color: 'white', backgroundColor: mainColor }}>
          <Stop />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '250px' }}>
          <VolumeDown color="primary" />
          <Slider value={volume} onChange={handleChangeVolume} sx={{ width: '70%', marginLeft: 1, marginRight: 3 }} />
          <VolumeUp color="primary" />
        </Box>
        <ToggleButtonGroup
          exclusive
          value={rate}
          onChange={handleChangeRate}
          color="primary"
          sx={{ minWidth: '240px' }}
        >
          {speedSelection.map((speed) => (
            <ToggleButton value={speed} sx={{ width: '20%' }}>
              {speed}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </div>
  );
};

export default Reading;
