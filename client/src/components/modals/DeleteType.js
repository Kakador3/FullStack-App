import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Modal, Dropdown } from 'react-bootstrap'
import { deleteType, fetchTypes } from '../../http/deviceAPI.js'
import { Context } from '../../index.js'

// @ts-ignore
const DeleteType = observer(({ show, onHide }) => {
  const { device } = useContext(Context)

  //Функция удаляет тип по выбранному id и запрашивает с сервера новый список типов
  //По таймауту очищается значение выпадающего списка
  const delType = () => {
    deleteType(device.selectedType.id)
      .then((data) => {
        setTimeout(() => {
          device.setSelectedType({})
        }, 150)

        fetchTypes().then((data) => device.setTypes(data))
        onHide()
      })
      .catch((error) => alert(error.response.data.message))
  }

  //Функция закрывает модальное окно и по таймауту очищает выбранный тип
  const close = () => {
    if (device.selectedType.id) {
      setTimeout(() => {
        device.setSelectedType({})
      }, 150)
    }
    onHide()
  }

  return (
    <Modal show={show} onHide={close} size='lg' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Удалить тип
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
      </Modal.Body>

      <Modal.Footer>
        <Button variant='outline-success' onClick={close}>
          Закрыть
        </Button>

        <Button variant='outline-danger' onClick={delType}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default DeleteType
