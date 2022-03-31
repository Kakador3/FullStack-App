// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Col, Image, Row, Card, Button } from 'react-bootstrap'
import bigStar from '../assets/bigStar.png'
import { fetchOneDevice } from '../http/deviceAPI'
import { Spinner } from 'react-bootstrap'

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] })
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    fetchOneDevice(id)
      .then((data) => setDevice(data))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Spinner animation='grow' />
  }

  return (
    <Container className='mt-3'>
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>

        <Col md={4}>
          <Col className='d-flex flex-column align-items-center'>
            <h2>{device.name}</h2>

            <div
              className='d-flex align-items-center justify-content-center'
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: 'cover',
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </Col>
        </Col>

        <Col md={4}>
          <Card
            className='d-flex flex-column align-items-center justify-content-around'
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: '5px solid lightgray',
              float: 'right',
            }}
          >
            <h3>От: {device.price} руб.</h3>

            <Button variant={'outline-dark'}>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>

      <Col className='d-flex flex-column m-3'>
        <h1>Характеристики</h1>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? 'lightgray' : 'transparent',
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Col>
    </Container>
  )
}

export default DevicePage
