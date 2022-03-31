import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateType from '../components/modals/CreateType'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import DeleteType from '../components/modals/DeleteType'
import DeleteBrand from '../components/modals/DeleteBrand'
import DeleteDevice from './../components/modals/DeleteDevice'

const Admin = () => {
  //Состояния для добавления
  const [typeVisible, setTypeVisible] = useState(false)
  const [brandVisible, setBrandVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)

  //Состояния для удаления

  const [deleteTypeVisible, setDeleteTypeVisible] = useState(false)
  const [deleteBrandVisible, setDeleteBrandVisible] = useState(false)
  const [deleteDeviceVisible, setDeleteDeviceVisible] = useState(false)

  return (
    <Container className='d-flex flex-column'>
      <Button
        onClick={() => setTypeVisible(true)}
        variant={'outline-dark'}
        className='mt-4 p-2'
      >
        Добавить тип
      </Button>

      <Button
        onClick={() => setBrandVisible(true)}
        variant={'outline-dark'}
        className='mt-2'
      >
        Добавить бренд
      </Button>

      <Button
        onClick={() => setDeviceVisible(true)}
        variant={'outline-dark'}
        className='mt-2'
      >
        Добавить устройство
      </Button>

      <Button
        onClick={() => setDeleteTypeVisible(true)}
        variant={'outline-dark'}
        className='mt-2'
      >
        Удалить тип
      </Button>

      <Button
        onClick={() => setDeleteBrandVisible(true)}
        variant={'outline-dark'}
        className='mt-2'
      >
        Удалить бренд
      </Button>

      <Button
        onClick={() => setDeleteDeviceVisible(true)}
        variant={'outline-dark'}
        className='mt-2'
      >
        Удалить устройство
      </Button>

      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />

      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />

      <CreateDevice
        // @ts-ignore
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />

      <DeleteType
        // @ts-ignore
        show={deleteTypeVisible}
        onHide={() => setDeleteTypeVisible(false)}
      />

      <DeleteBrand
        // @ts-ignore
        show={deleteBrandVisible}
        onHide={() => setDeleteBrandVisible(false)}
      />

      <DeleteDevice
        // @ts-ignore
        show={deleteDeviceVisible}
        onHide={() => setDeleteDeviceVisible(false)}
      />
    </Container>
  )
}

export default Admin
