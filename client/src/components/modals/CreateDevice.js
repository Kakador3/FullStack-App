import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../index.js'
import { Button, Modal, Dropdown, Form, Row, Col } from 'react-bootstrap'
import {
  fetchTypes,
  fetchBrands,
  createDevice,
  fetchDevices,
} from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite'

// @ts-ignore
const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context)

  //Оживление инпутов
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data))
    fetchBrands().then((data) => device.setBrands(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Добавить в массив строку информации
  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }

  //Удалить из массива строку информации
  const removeInfo = (number) => {
    setInfo(info.filter((infoElement) => infoElement.number !== number))
  }

  //В массиве строка(number) меняет значение инпута(value) в поле(key)
  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((infoElement) =>
        infoElement.number === number
          ? { ...infoElement, [key]: value }
          : infoElement
      )
    )
  }

  const selectFile = (event) => {
    setFile(event.target.files[0])
  }

  //Формируем формДату и отправляем на сервер, после чего очищаем все поля и запрашиваем с сервера новый список устройств
  //По таймауту очищаются все инпуты и выпадающие списки
  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${Number(price)}`)
    formData.append('img', file)
    formData.append('typeId', device.selectedType.id)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData)
      .then((data) => {
        setTimeout(() => {
          device.setSelectedType({})
          device.setSelectedBrand({})
          setName('')
          setPrice('')
          setInfo([])
        }, 150)

        fetchDevices(null, null, null, null).then((data) =>
          device.setDevices(data.rows)
        )
        onHide()
      })
      .catch((error) => alert(error.response.data.message))
  }

  //Функция закрывает модальное окно и по таймауту очищает все заполненные поля
  const close = () => {
    setTimeout(() => {
      if (device.selectedType.id && device.selectedBrand.id) {
        device.setSelectedType({})
        device.setSelectedBrand({})
      } else if (device.selectedType.id) {
        device.setSelectedType({})
      } else if (device.selectedBrand.id) {
        device.setSelectedBrand({})
      }

      if (name) {
        setName('')
      }

      if (price) {
        setPrice('')
      }

      if (info.length) {
        setInfo([])
      }
    }, 150)

    onHide()
  }

  return (
    <Modal show={show} onHide={close} size='lg' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Добавить устройство
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>
              {device.selectedType.name || 'Выберите тип'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className='mt-3 mb-2'>
            <Dropdown.Toggle>
              {device.selectedBrand.name || 'Выберите бренд'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            value={name}
            onChange={(event) => setName(event.target.value)}
            className='mt-3'
            placeholder='Введите название устройства'
          />

          <Form.Control
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className='mt-3'
            placeholder='Введите стоимость устройства'
            type='number'
          />

          <Form.Control className='mt-3' type='file' onChange={selectFile} />

          <hr />

          <Button variant='outline-dark' onClick={addInfo}>
            Добавить новое свойство
          </Button>

          {info.map((infoElement) => (
            <Row className='mt-3' key={infoElement.number}>
              <Col md={4}>
                <Form.Control
                  value={infoElement.title}
                  onChange={(event) =>
                    changeInfo('title', event.target.value, infoElement.number)
                  }
                  placeholder='Введите название свойства'
                />
              </Col>

              <Col md={4}>
                <Form.Control
                  value={infoElement.description}
                  onChange={(event) =>
                    changeInfo(
                      'description',
                      event.target.value,
                      infoElement.number
                    )
                  }
                  placeholder='Введите описание свойства'
                />
              </Col>

              <Col md={4}>
                <Button
                  onClick={() => removeInfo(infoElement.number)}
                  variant='outline-danger'
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='outline-danger' onClick={close}>
          Закрыть
        </Button>

        <Button variant='outline-success' onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice
