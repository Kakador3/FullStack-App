import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import TypeBar from '../components/TypeBar'
import BrandBar from './../components/BrandBar'
import DeviceList from './../components/DeviceList'
import { Context } from '../index.js'
import { fetchTypes, fetchBrands, fetchDevices } from '../http/deviceAPI'
import Pages from '../components/Pages'

const Shop = observer(() => {
  const { device } = useContext(Context)
  const [loading, setLoading] = useState(true)

  //Первичная загрузка с сервера
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Загружать данные при смене страницы, типа или бренда
  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      device.limit
    )
      .then((data) => {
        device.setDevices(data.rows)
        device.setTotalCount(data.count)
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device.page, device.selectedType, device.selectedBrand])

  if (loading) {
    return <Spinner animation='grow' />
  }

  return (
    <Container>
      <Row className='mt-2'>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  )
})

export default Shop
