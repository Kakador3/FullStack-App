import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Modal, Dropdown } from 'react-bootstrap'
import { deleteBrand, fetchBrands } from '../../http/deviceAPI.js'
import { Context } from '../../index.js'

// @ts-ignore
const DeleteBrand = observer(({ show, onHide }) => {
  const { device } = useContext(Context)

  // useEffect(() => {
  //   fetchBrands().then((data) => device.setBrands(data))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  //Функция удаляет тип по выбранному id и запрашивает с сервера новый список брендов
  const delBrand = () => {
    deleteBrand(device.selectedBrand.id)
      .then((data) => {
        setTimeout(() => {
          device.setSelectedBrand({})
        }, 150)

        fetchBrands().then((data) => device.setBrands(data))
        onHide()
      })
      .catch((error) => alert(error.response.data.message))
  }

  //Функция закрывает модальное окно и по таймауту очищает выбранный бренд
  //По таймауту очищается значение выпадающего списка
  const close = () => {
    if (device.selectedBrand.id) {
      setTimeout(() => {
        device.setSelectedBrand({})
      }, 150)
    }
    onHide()
  }

  return (
    <Modal show={show} onHide={close} size='lg' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Удалить бренд
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Dropdown className='mt-2 mb-2'>
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
      </Modal.Body>

      <Modal.Footer>
        <Button variant='outline-success' onClick={close}>
          Закрыть
        </Button>

        <Button variant='outline-danger' onClick={delBrand}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default DeleteBrand
