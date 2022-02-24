import theme from '@lib/theme'
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
  /**
   * Exibe ou não a legenda da celula
   */
  showCellLabel?: boolean
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
  /**
   * Exibe ou não a legenda da celula
   */
  showCellLabel?: boolean
}

const highlightColors = [
  theme.palette.background.paper,
  theme.palette.info.light,
  theme.palette.success.light,
  theme.palette.primary.light,
  theme.palette.secondary.light
]

const PacketCell = ({ bit, editable = false, pos, onClick = (() => {}), showCellLabel = false}: PacketCellProps) => {
  const [clicked, setClicked] = useState(false)
  const [highlighted, setHighlighted] = useState(0)


  return (
    <Grid 
      xs={3} 
      item 
      onClick={() => {
        if (editable) {
          onClick()
          setClicked(v => !v)
        } else {
          setHighlighted(v => (v+1)%5)
        }
      }} 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        border: '1px solid',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme => clicked ? theme.palette.error.light : highlightColors[highlighted]
      }}
    >
      {bit}
      {showCellLabel && <small>{`0000${pos.toString(2)}`.slice(-4)}</small>}
    </Grid>
  )
}

const Packet = ({ bits, editable = false, onClick: handleClick = (() => {}), packetNumber, showCellLabel = false}: PacketProps) => {
  return (
    <Grid container spacing={0}>
      { bits.split('').map((bit, k) => (
        <PacketCell 
          {...{bit, editable}} 
          key={k} 
          pos={k}
          showCellLabel={showCellLabel}
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