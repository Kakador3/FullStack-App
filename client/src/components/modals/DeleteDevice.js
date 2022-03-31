import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Modal, Dropdown } from 'react-bootstrap'
import { deleteDevice, fetchDevices } from '../../http/deviceAPI.js'
import { Context } from '../../index.js'
import DeviceItem from 'components/DeviceItem.js'

// @ts-ignore
const DeleteDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context)
  const brands = device.brands

  useEffect(() => {
    fetchDevices(null, null, null, null).then((data) =>
      device.setDevices(data.rows)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Функция удаления, удаляет девайс по выбранному id и запрашивает с сервера новый список девайсов
  //По таймауту очищается значение выпадающего списка
  const delDivece = () => {
    deleteDevice(device.selectedDevice.id)
      .then((data) => {
        setTimeout(() => {
          device.setSelectedDevice({})
        }, 150)

        fetchDevices(null, null, null, null).then((data) =>
          device.setDevices(data.rows)
        )
        onHide()
      })
      .catch((error) => alert(error.response.data.message))
  }

  //Функция закрывает модальное окно и по таймауту очищает выбранный девайс
  const close = () => {
    if (device.selectedDevice.id) {
      setTimeout(() => {
        device.setSelectedDevice({})
      }, 150)
    }
    onHide()
  }

  return (
    <Modal show={show} onHide={close} size='lg' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Удалить устройство
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Dropdown className='btn-group' style={{ height: 40 }}>
            <Dropdown.Toggle>
              {device.selectedDevice.name || 'Выберите устройство'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {device.devices.map((deviceItem) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedDevice(deviceItem)}
                  key={deviceItem.id}
                >
                  {deviceItem.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {device.selectedDevice.id && (
            <DeviceItem device={device.selectedDevice} brands={brands} />
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='outline-success' onClick={close}>
          Закрыть
        </Button>

        <Button variant='outline-danger' onClick={delDivece}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default DeleteDevice
