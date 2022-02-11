import bytesToText from '@lib/utils/bytesToText'
import hammingDecode from '@lib/utils/hammingDecode'
import parityDecode from '@lib/utils/parityDecode'
import repetitionDecode from '@lib/utils/repetitionDecode'
import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Packet from './Packet'

interface CodeDisplayProps {
  /**
   * Código a ser exibido pelo componente
   */
  code: string
  /**
   * Propriedade que define se os dados do componente podem ser editados
   */
  editable?: boolean
  /**
   * Tipo de código exibido pelo componente, utilizado para decodificar a mensagem
   */
  codeType: 'hamming' | 'repetition' | 'raw' | 'parity'
}

const CodeDisplay = ({ code, editable = false, codeType }: CodeDisplayProps) => {
  /**
   * Estado utilizado para modificar a mensagem original
   */
  const [receivedPackets, setReceivedPackets] = useState<string[]>([])

  useEffect(() => {
    const packets = code.match(/.{1,16}/g)
    
    if (packets) {
      setReceivedPackets(packets)
    } else {
      setReceivedPackets([])
    }
  }, [code])

  /**
   * Função utilizada para modificar um pacote do código, faz com que o usuário possa 
   * interagir e modificar o código exibido
   * 
   * @param packet sequência de bits contida no pacote 
   * @param packetNumber posição do pacote na lista que os armazena
   */
  const changePacket = (packet: string, packetNumber: number) => {
    const newPackets = receivedPackets?.slice()

    if (newPackets) {
      newPackets[packetNumber] = packet
      setReceivedPackets(newPackets)
    }
  }

  const text = !editable ? <>Código original <br /> <small>{code}</small></> : <>Código modificado <br /> <small>{receivedPackets.join('')}</small></>

  /**
   * Componente que exibe a mensagem decodificada
   */
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