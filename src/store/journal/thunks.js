import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {

    dispatch(savingNewNote());

    const { uid } = getState().auth;
    // uid

    const newNote = {
      title: 'Título',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto explicabo hic non commodi natus sit, amet dolorum esse repellendus quisquam debitis quis labore et quidem facilis placeat similique minus nemo.',
      date: new Date().getTime(),
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    const setDocResp = await setDoc(newDoc, newNote);
    // console.log({ newDoc, setDocResp });

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));

    // dispatch (new Note)
    // dispatch (activarNote)
  }
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {


    const { uid } = getState().auth;
    if (!uid) throw new Error('El UID del usuario no existe')

    // console.log(uid)

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes))

  }

};

export const startSaveNote = () => {
  return async (dispatch, getState) => {

    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    // eliminamos el id ya que en la nota activa viene el id
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    // actualizamos la nota en local
    dispatch(updateNote(note));
  }
};

// *** Subiendo archivos
export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving()); //bloquea la app 
    // console.log(files);

    // await fileUpload(files[0]);
    // utilizamos un arreglo de promesas para esperar por todas las respuestas 
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    // console.log(photosUrls);

    dispatch(setPhotosToActiveNote(photosUrls));

  }
};

// *** Eliminando nota
export const startDeletingNote = () => {
  return async (dispatch, getState) => {

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    console.log({ uid, note });

    // eliminar nota de firebase
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    // eliminamos de local
    dispatch(deleteNoteById(note.id));
  }
};