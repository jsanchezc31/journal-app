import { useState, useEffect, useMemo } from "react";

const useForm = (initialForm = {}, formValidations = {}) => {

  const [formState, setformState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({})

  // Solo se manda a llamar cuando se actualkiaz el formstate
  useEffect(() => {
    createValidators();
  }, [formState])

  const isFormValid = useMemo(() => {

    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation])

  const onInputChange = (event) => {
    // console.log(event.target.name);
    const { target } = event;
    const { name, value } = target;

    setformState({
      ...formState,
      [name]: value, //Propiedad computada del objeto
    });
  };

  const onResetForm = () => {
    setformState(initialForm);
  };

  // VALIDACIONES

  const createValidators = () => {

    const formCheckedValues = {};

    // Con el for se obtiene cada propiedad
    for (const formField of Object.keys(formValidations)) {
      // Obtenemos la funcion y el mensaje de error de la propiedad del objeto
      const [fn, errorMessage] = formValidations[formField];

      // Si la condición de la función se cumple se devuelve un true y este se guarda en formCheckedValues con un nombre nuevo, por ejemplo emailValid
      formCheckedValues[`${formField}Valid`] =
        fn(formState[formField]) ? null : errorMessage
    }

    // se añade el nuevo valor
    setFormValidation(formCheckedValues);
  }

  return {
    ...formState, //Podemos desestructurar para ya enviarlo desestructurar
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid
  };
};

export default useForm;

