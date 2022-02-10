import bytesToText from '@lib/utils/bytesToText'
import hammingDecode from '@lib/utils/hammingDecode'
import parityDecode from '@lib/utils/parityDecode'
import repetitionDecode from '@lib/utils/repetitionDecode'
import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Packet from './Packet'

interface CodeDisplayProps {
  code: string
  editable?: boolean
  codeType: 'hamming' | 'repetition' | 'raw' | 'parity'
}

const CodeDisplay = ({ code, editable = false, codeType }: CodeDisplayProps) => {
  const [receivedPackets, setReceivedPackets] = useState<string[]>([])

  useEffect(() => {
    const packets = code.match(/.{1,16}/g)
    
    if (packets) {
      setReceivedPackets(packets)
    } else {
      setReceivedPackets([])
    }
  }, [code])

  const changePacket = (packet: string, packetNumber: number) => {
    const newPackets = receivedPackets?.slice()

    if (newPackets) {
      newPackets[packetNumber] = packet
      setReceivedPackets(newPackets)
    }
  }

  const text = !editable ? <>Código original <br /> <small>{code}</small></> : <>Código modificado <br /> <small>{receivedPackets.join('')}</small></>

  const Message = () => {
    const [decoded, setDecoded] = useState({
      message: '',
      errors: 0
    })

    useEffect(() => {
      switch (codeType) {
        case 'parity':
          setDecoded(parityDecode(receivedPackets.join('')))
          break
        case 'hamming':
          setDecoded(hammingDecode(receivedPackets.join('')))
          break
        case 'repetition':
          setDecoded(repetitionDecode(receivedPackets.join('')))
          break
        case 'raw':
          setDecoded({
            message: bytesToText(receivedPackets.join('')),
            errors: 0
          })
      }
    }, [])

    

    return (
      <Typography variant="body2">
        <b>Mensagem Recebida:</b> {decoded.message} <br />
        <b>Erros detectados:</b> {`${decoded.errors}`}
      </Typography>
    )
  }

  if (receivedPackets.length > 0)
    return (
      <>
        <Typography variant="body1">
        { text }
        </Typography>
        <br />
        <Message />
        <Grid container spacing={1}>
          {
            receivedPackets.map((packet, i) => (
              <Grid item xs={3} key={i}>
                <Packet bits={packet} editable={editable} onClick={editable ? changePacket : undefined} packetNumber={i}/>
              </Grid>
            ))
          }
        </Grid>
      </>
    )

  return (
    <Typography>
      Nenhuma mensagem foi especificada.
    </Typography>
  )
}

export default CodeDisplay