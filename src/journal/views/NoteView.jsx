import { useEffect, useMemo, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutline, NestCamWiredStandTwoTone, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'

import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks'
import { ImageGallery } from '../components/ImageGallery'
import useForm from '../../hooks/useForm'

export const NoteView = () => {

  const dispatch = useDispatch();


  // *** Seleccion nota activa
  // Obtenemos la nota y se la pasamos al useForm
  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
  // Nos traemos lo valores de la nota activa (previamente hemos selecionando/activado la nota

  const { body, title, date, onInputChange, formState } = useForm(note)
  // Fin seleccionar nota activa

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date])

  // *** Subir imagen -> usamos el useref para no tener que usar el input text
  // mantiene la referencia de html
  const fileInputRef = useRef();

  //*** Cuando cualquier parte de formulario cambia llamamos un dispatch con la función de activar la nota y cambiar su estato (valores)
  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  // *** mostrar mensaje modal de nota actualizada
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }

  }, [messageSaved])


  //*** guardamos la nota activa en la base de datos
  const onSaveNote = () => {
    console.log("onSaveNorte");
    dispatch(startSaveNote());
  };

  // *** Guardamos multiples imagenes
  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    console.log("Subiendo archivos");
    // console.log(target.files);
    dispatch(startUploadingFiles(target.files));
  };

  // *** Eliminar nota
  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
      </Grid>
      <Grid item>

        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}>
          <UploadOutlined />
        </IconButton>

        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese título'
          label='Título'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Cosas del día?'
          sx={{ border: 'none', mb: 1 }}
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>


      {/* Botón para eliminar */}
      <Grid container justifyContent='end'>
        <Button
          onClick={onDelete}
          sx={{ mt: 2 }}
          color='error'
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>
      {/* componente de imagenes */}
      {/* Ya tenemos la nota y previamente las iamgenes */}
      <ImageGallery images={note.imageUrls} />


    </Grid>
  )
}
