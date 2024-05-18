import React, { useEffect, useState } from 'react';
import styles from "./TableUserDue.module.scss";
import Pagination from '../Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Form from "../Form/FormMail/FormMail"
import Swal from 'sweetalert2';

function TableUserDue() {

  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
  }, [])

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleChangeStatus = async (idPeople, state) => {
    try {
      const auxState = state === "Active" ? "Inactive" : "Active";
      const response = await axios.put(`${REACT_APP_API_URL}/people`, {
        "idPeople": idPeople,
        "state": auxState
      });
      if (response.status === 200) {
      }
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
   
  }

  const handleChangeCancel = async (idValue, state) => {
    try {
      const auxState = state === "Deleted" ? "Active" : "Deleted";
      const response = await axios.put(`${REACT_APP_API_URL}/people`, {
        "idPeople": idValue,
        "state": auxState
      });
      if (response.status === 200) {
      }
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  const onMailButtonClick = (email) => {
    setEmail(email)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container_header}>
        <p className={styles.title}>Historial de Pago:</p>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.firstTh}>Nombre Completo</th>
              <th>Correo Electrónico</th>
              <th className={styles.centerTd}>Estado</th>
              <th className={styles.centerTd}>Ultimo Pago</th>
              <th className={styles.centerTd}>Monto Pagado</th>
              <th className={styles.centerTd}>Emision de Deuda</th>
              <th className={styles.centerTd}>Vencimiento</th>
              <th></th>
              <th></th>
              <th className={styles.lastTh}></th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
      {showForm && <Form handleShowForm={handleShowForm} email={email} />}
      {/* <div>
      <Pagination pageNumber={InfoPag.pageNumber} totalOfPages={InfoPag.totalOfPages} onPageChange={handlerPagination}/>
      </div> */}
    </div>
  );
}

export default TableUserDue;