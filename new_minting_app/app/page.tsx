"use client";

import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

import { useState, useEffect} from 'react'
import {ethers} from "ethers"
import { Button, Grid, Stack , Box } from "@mui/material";


declare let window:any



const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  
  const [balance, setBalance] = useState<string | undefined>()
  const [currentAccount, setCurrentAccount] = useState<string | undefined>()
  const [chainId, setChainId] = useState<number | undefined>()
  const [chainname, setChainName] = useState<string | undefined>()

  



const onClickConnect = () => {
  //client side code
  if(!window.ethereum) {
    console.log("please install MetaMask")
    return
  }

  if (window.ethereum)  {
     const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    provider.send("eth_requestAccounts", [])
    .then((accounts)=>{
      if(accounts.length>0) setCurrentAccount(accounts[0])
    })
    .catch((e)=>console.log(e))
  }
  }

  const onClickDisconnect = () => {
    console.log("onClickDisConnect")
    setBalance(undefined)
    setCurrentAccount(undefined)
  }

  useEffect(() => {
    if(!currentAccount || !ethers.utils.isAddress(currentAccount)) return
    //client side code
    if(!window.ethereum) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getBalance(currentAccount).then((result)=>{
      setBalance(ethers.utils.formatEther(result))
    })
    provider.getNetwork().then((result)=>{
      setChainId(result.chainId)
      setChainName(result.name)
    })

  },[currentAccount])



  return (
    <Grid container height="100vh" alignItems="center" justifyContent="center" direction="column">
      <h1>Using Material UI with Next.js 13</h1>
      <Stack direction="row" columnGap={1}>
        <Button variant="text" onClick={onClickConnect}>Connect</Button>
        <Button variant="contained"  onClick={onClickDisconnect} >Disconnect</Button>
        <Button variant="outlined">Outlined</Button>
        <Box>
          balance {balance}
        </Box>
      </Stack>
    </Grid>
  );
}

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <div className={styles.description}>
//         <p>
//           Get started by editing&nbsp;
//           <code className={styles.code}>app/page.tsx</code>
//         </p>
//         <div>
//           <a
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className={styles.vercelLogo}
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className={styles.center}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//         <div className={styles.thirteen}>
//           <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
//         </div>
//       </div>

//       <div className={styles.grid}>
//         <a
//           href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={inter.className}>
//             Docs <span>-&gt;</span>
//           </h2>
//           <p className={inter.className}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={inter.className}>
//             Templates <span>-&gt;</span>
//           </h2>
//           <p className={inter.className}>Explore the Next.js 13 playground.</p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={inter.className}>
//             Deploy <span>-&gt;</span>
//           </h2>
//           <p className={inter.className}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   )
// }
