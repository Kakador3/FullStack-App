import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Row } from 'react-bootstrap'
import DeviceItem from './DeviceItem'

const DeviceList = observer(() => {
  const { device } = useContext(Context)
  const brands = device.brands

  return (
    <Row className='d-flex ps-3'>
      {device.devices.map((device) => (
        <DeviceItem key={device.id} device={device} brands={brands} />
      ))}
    </Row>
  )
})

export default DeviceList
