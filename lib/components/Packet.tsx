import { Grid } from '@mui/material'
import React, { useState } from 'react'

interface PacketProps {
  bits: string
  editable?: boolean
  onClick?: (packet: string, packetNumber: number) => void
  packetNumber: number
}

interface PacketCellProps {
  bit: string
  editable: boolean
  onClick?: () => void
  pos: number
}

const PacketCell = ({ bit, editable = false, pos, onClick}: PacketCellProps) => {
  return (
    <Grid 
      xs={3} 
      item 
      onClick={onClick ?? (() => {})} 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        cursor: editable ? 'pointer' : 'default',
        border: '1px solid',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {bit}
      <small>{`0000${pos.toString(2)}`.slice(-4)}</small>
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