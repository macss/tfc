import { Grid } from '@mui/material'
import React, { useState } from 'react'

interface PacketProps {
  /**
   * Sequência de bits a ser exibida
   */
  bits: string
  /**
   * Propriedade que controla se o componente é interativo ou não
   */
  editable?: boolean
  /**
   * Função que atua quando ocorre um clique em uma célula
   */
  onClick?: (packet: string, packetNumber: number) => void
  /**
   * Posição do pacote na lista original de pacotes
   */
  packetNumber: number
}

interface PacketCellProps {
  /**
   * Bit a ser exibido pelo componente
   */
  bit: string
  /**
   * Propriedade que controla se o componente é interativo ou não
   */
  editable: boolean
  /**
   * Função que atua quando ocorre um clica na célula
   */
  onClick?: () => void
  /**
   * Posição do bit no pacote em que está
   */
  pos: number
}

const PacketCell = ({ bit, editable = false, pos, onClick = (() => {})}: PacketCellProps) => {
  const [clicked, setClicked] = useState(false)

  return (
    <Grid 
      xs={3} 
      item 
      onClick={() => {
        if (editable) {
          onClick()
          setClicked(v => !v)
        }
      }} 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        cursor: editable ? 'pointer' : 'default',
        border: '1px solid',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme => clicked ? theme.palette.error.light : theme.palette.background.paper
      }}
    >
      {bit}
      {/*<small>{`0000${pos.toString(2)}`.slice(-4)}</small>*/}
    </Grid>
  )
}

const Packet = ({ bits, editable = false, onClick: handleClick = (() => {}), packetNumber}: PacketProps) => {
  return (
    <Grid container spacing={0}>
      { bits.split('').map((bit, k) => (
        <PacketCell 
          {...{bit, editable}} 
          key={k} 
          pos={k}
          onClick={() => {
            if (editable) {
              const newPacket = bits.split('').map((bit, idx) => {
                if (idx === k) {
                  return bit === '0' ? '1' : '0'
                }
                return bit
              }).join('')

              handleClick(newPacket, packetNumber)
            }
          }}
        />
      ))}
    </Grid>
  )
}

export default Packet