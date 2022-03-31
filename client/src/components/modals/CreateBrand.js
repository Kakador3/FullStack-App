import React, { useState, useContext } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { createBrand, fetchBrands } from '../../http/deviceAPI.js'
import { Context } from '../../index.js'

const CreateBrand = ({ show, onHide }) => {
  const { device } = useContext(Context)
  const [value, setValue] = useState('')

  //Функция добавляет тип и запрашивает с сервера новый список брендов
  //По таймауту очищается инпут
  const addBrand = () => {
    createBrand({ name: value }).then((data) => {
      setTimeout(() => {
        setValue('')
      }, 150)
      fetchBrands().then((data) => device.setBrands(data))
      onHide()
    })
  }

  //Функция закрывает модальное окно и по таймауту очищает инпут
  const close = () => {
    if (value) {
      setTimeout(() => {
        setValue('')
      }, 150)
    }
    onHide()
  }

  return (
    <Modal show={show} onHide={close} size='lg' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Добавить бренд
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={'Введите название бренда'}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='outline-danger' onClick={close}>
          Закрыть
        </Button>

        <Button variant='outline-success' onClick={addBrand}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateBrand
