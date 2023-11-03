import React from 'react';
import './Result.scss';
import { QUIZ_VISIBILITY, ROLE } from '../../utils/constants';
import { Button } from '@mui/material';
import { ExitToApp, Save } from '@mui/icons-material';
import { quizServices } from '../../services/quizServices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Result = ({ role, player, quiz, topPlayers }) => {
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();

  console.log('quiz in result component', quiz);

  return (
    <div className={`result ${role === ROLE.PLAYER ? 'result-player-role' : ''}`}>
      <div className={`result-inner ${role === ROLE.PLAYER ? 'result-inner-player-role' : ''}`}>
        {role === ROLE.HOST && (
          <div className="btn-exit">
            <Button variant="contained" endIcon={<ExitToApp />}>
              Exit
            </Button>
          </div>
        )}
        <div className="result-rank">
          <div className="result-rank-second">
            <div className="player">{topPlayers[1]?.nickname || ''}</div>
            <div className="player-score">{topPlayers[1]?.score || ''}</div>
          </div>
          <div className="result-rank-first">
            <div className="player">{topPlayers[0]?.nickname}</div>
            <div className="player-score">{topPlayers[0]?.score}</div>
          </div>
          <div className="result-rank-third">
            <div className="player">{topPlayers[2]?.nickname || ''}</div>
            <div className="player-score">{topPlayers[2]?.score || ''}</div>
          </div>
        </div>
      </div>
      {role === ROLE.PLAYER && (
        <div className="result-score">
          <p>Your score is {player?.score}.</p>
          <p>Congratulations!</p>
        </div>
      )}
    </div>
  );
};

export default Result;
