import { useState } from 'react';
import './App.css';
import React from 'react';
import {Box, Button,Flex, Image, Link, Spacer, Input, Text} from '@chakra-ui/react';
import Discord from "./assets/social-media-icons/discord_32x32.png";
import Twitter from "./assets/social-media-icons/twitter_32x32.png";
import yourcollection from "./artifacts/contracts/yourcollection.sol/yourcollection.json";
import { ethers, BigNumber } from 'ethers';

const yourcollectionAddress = "0xB1d6701Cd5286C98b5969E9070e48abDD74546c5";

function App() {
  const[accounts, setAccounts] = useState([]);

const NavBar =({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount(){
        if (window.ethereum){
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }
    return (
    <Flex justify ="space-between" align ="center" padding="30px">
        <Flex justify ="space-around" width ="20%" padding="0 75px">
        <Link href="https://www.facebook.com">
            <Image src={Discord} boxSize="42px" margin="0 15px"/>
            </Link>    
            <Link href="https://www.twitter.com">
            <Image src={Twitter} boxSize="42px" margin="0 15px"/>
            </Link>      
        </Flex>



        <Flex justify ="space-between" align ="center" padding="30px">
        
        {isConnected ? (
        <Box margin ="0 25px">Connected</Box>
        ) : (
            <Button
            background="#D6517D"
            borderRadius="5px"
            boxShadow="0px 2 px 2px 1px #0F0F0F"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            margin="0 15px"
            onClick={connectAccount}>
            Connect
            </Button>
        )
        }
    </Flex>
</Flex>

    );
};

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
      if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
              yourcollectionAddress,
              yourcollection.abi,
              signer
          );

          try {
              const response = await contract.mint(BigNumber.from(mintAmount),{
                  value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
              });
              console.log('response:', response);
          } catch (err) {
              console.log("error:", err)
          }
      }
  }
  const handleDecrement = () => {
      if (mintAmount <= 1) return;
      setMintAmount(mintAmount - 1);
  };
  const handleIncrement = () => {
      if (mintAmount >= 3) return;
      setMintAmount(mintAmount + 1);
  };
  return (
      <Flex justify="center" align="center" height="35vh" paddingBottom="150px">
          <Box width="620px">
              <div>

                  <Text fontSize="45px" textShadow="0 5px #000000">DeGodsYachClub</Text>
                  <Text
                      fontSize="40px"
                      letterSpacing="-5.5%"
                      fontFamily="VT323"
                      textShadow="0 2px #000000"
                  >
                      The Gods Around Oddin Table are the Best heros
                  </Text>
              </div>


              {isConnected ? (
                  <div>
                      <Flex  align ="center" justify ="center">
                          <Button 
                                      background="#D6517D"
                                      borderRadius="5px"
                                      boxShadow="0px 2 px 2px 1px #0F0F0F"
                                      color="white"
                                      cursor="pointer"
                                      fontFamily="inherit"
                                      padding="15px"
                                      marginTop="10px"
                          onClick={handleDecrement}
                          >-
                          </Button>
                          <Input 
                          readOnly
                          fontFamily="inherit"
                          width="100px"
                          height="40px"
                          textAlign="center"
                          paddingLeft="19px"
                          marginTop="10px"
                          type="number" 
                          value={mintAmount} />
                          <Button 
                                      background="#D6517D"
                                      borderRadius="5px"
                                      boxShadow="0px 2 px 2px 1px #0F0F0F"
                                      color="white"
                                      cursor="pointer"
                                      fontFamily="inherit"
                                      padding="15px"
                                      marginTop="10px"
                          onClick={handleIncrement}>+</Button>
                      </Flex>
                      <Button 
                        background="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2 px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        marginTop="10px"
                      onClick={handleMint}>Mint Now</Button>
                  </div>

              ) : (
                  <Text
                  marginTop="70px"
                  fontSize="40px"
                      letterSpacing="-5.5%"
                      fontFamily="VT323"
                      textShadow="0 3px #000000"
                      color="#D6517D"
                  >You must be connected to Mint.</Text>
              )}
              </Box>

      </Flex>
  );
};

  return (
    <div className="overplay">
    <div className="App">
      <NavBar accounts={accounts} setAccounts={setAccounts} />
      <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className="moving-background"></div>
    </div>);
    
}

export default App;
