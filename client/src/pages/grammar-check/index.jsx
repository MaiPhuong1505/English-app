import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Chip, Typography } from '@mui/material';
import { Error } from '@mui/icons-material';
import { Sapling } from '@saplingai/sapling-js/observer';
import './GrammarCheck.scss';

const GrammarCheck = () => {
  const [errorCount, setErrorCount] = useState(0);
  const checking = async (text) => {
    console.log('text', text);
    try {
      const response = await axios.post('https://api.sapling.ai/api/v1/edits', {
        key: '0GJWMY8XWVY9FWA9617PW7N6P1UICIUN',
        session_id: 'test session',
        text,
      });
      const { data } = response;
      console.log(data);
      setErrorCount(data.edits?.length);
    } catch (err) {
      const { msg } = err.response.data;
      console.log({ err: msg });
    }
  };
  const handleChange = (e) => {
    checking(e.target.value);
  };
  useEffect(() => {
    Sapling.init({
      key: '0GJWMY8XWVY9FWA9617PW7N6P1UICIUN',
      endpointHostname: 'https://api.sapling.ai',
      editPathname: '/api/v1/edits',
      statusBadge: true,
      mode: 'dev',
      shadowRoot: false,
    });

    const editor = document.getElementById('editor');
    Sapling.observe(editor);
  });
  return (
    <>
      <div className="grammar-check">
        <Typography variant="h4" color="primary">
          GRAMMAR CHECKING
        </Typography>
        <Typography variant="caption text" className="provider">
          Provided by Sapling AI
        </Typography>
        <textarea
          className="text-editor"
          name="editor"
          id="editor"
          cols="30"
          rows="10"
          onChange={handleChange}
          placeholder="Enter your text here"
        ></textarea>
        <Chip
          label={`Error count: ${errorCount}`}
          icon={<Error />}
          variant="outlined"
          color="error"
          className="error-count"
        />
        {/* <div
        id="editor"
        sapling-ignore="true"
        contentEditable="true"
        className="text-editor"
        style={{
          margin: '40px auto',
          padding: '10px',
          border: '2px solid black',
          width: '500px',
          height: '200px',
        }}
      ></div> */}
      </div>
    </>
  );
};

export default GrammarCheck;
