import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Card, Col, Row } from 'react-bootstrap'

const BrandBar = observer(() => {
  const { device } = useContext(Context)
  return (
    <Row>
      <Col className='d-flex'>
        {device.brands.map((brand) => (
          <Card
            style={{ cursor: 'pointer' }}
            onClick={() => device.setSelectedBrand(brand)}
            border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
            key={brand.id}
            className='p-3'
          >
            {brand.name}
          </Card>
        ))}
      </Col>
    </Row>
  )
})

export default BrandBar
