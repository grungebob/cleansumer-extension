/* global chrome */

import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { Header } from './components/header';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Divider,
  Container,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react'
import BCorpLogo from '../assets/bCorpLogo'

const App = () => {
    const [score, setScore] = useState(null);
    const [host, setHost] = useState(null);
    const [profile, setProfile] = useState(null);
    const [displayScore, setDisplayScore] = useState(0);


    const getStorage = () => chrome.storage.sync.get((storage) => {
        // console.log(storage);
        if (storage.score && storage.host) {
            setScore(storage.score);
            setHost(storage.host);
            setProfile(storage.link)
        }
    });


  useEffect(() => {
      // console.log('getting storage');
    getStorage();
    // chrome.runtime.sendMessage({ insert message here });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDisplayScore(score);
    }, 300);
}, [score]);

  /* Listener for page change */
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('request: ', request)
    getStorage();
  });

  return (
    <Container padding='10px'>
      <Header />
        {score && score !== 'NaN' ?
            (
              
              <TableContainer>
                <Table variant='simple' size='lg'>
                  {/* <TableCaption>Cleansumer Scores:</TableCaption> */}
                  <Thead>
                    {/* <Tr>
                      <Td>{`Site: ${host}`}</Td>
                    </Tr>
                    <Divider /> */}
                  </Thead>
                  <Tbody>
                    <Tr alignContent='center'>
                    <Td/>
                      <Td fontSize='15px'>{`BCorp Overall Score:`}</Td>
                    <Td />
                      </Tr>
                    <Tr >
                      <Td width="20px"> <BCorpLogo /> </Td>
                      <Td alignItems='center' alignContent='center' textAlign='center'>
                        <CircularProgress min={0} max={200} value={displayScore} color='green' size='100px' thickness='12px'>
                          <CircularProgressLabel paddingBottom='20px'>
                            <div fontSize='20px'>
                            {score}
                            </div>
                            </CircularProgressLabel>
                        </CircularProgress>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontSize='15px'>
                      <a href={profile} target="_blank" rel="noreferrer"> Full B Corp Profile</a>
                      </Td>
                    </Tr>
                    <Tr />
                    <Tr />
                    <Tr />
                  </Tbody>
                  <Divider />
                  <Tfoot>
                    <Tr>
                      <Th fontSize='15px'><a href='https://www.linkedin.com/company/cleansumer' target='_blank'>Connect with us!</a></Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            )
            : (
            <div> 
                No B-Corp Score Found for this site
            </div>
            )
        }
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));