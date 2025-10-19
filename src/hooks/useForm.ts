import { useEffect, useMemo, useState, type ChangeEvent } from 'react';

// Tipos genéricos
type ValidationFunction<T> = (value: T[keyof T]) => boolean;
type ValidationRules<T> = {
  [K in keyof T]?: [ValidationFunction<T>, string];
};

type ValidationState<T> = {
  [K in keyof T as `${string & K}Valid`]?: string | null;
};

export function useForm<T extends Record<string, any>>(
  initialForm: T,
  formValidations: ValidationRules<T> = {}
) {
  const [formState, setFormState] = useState<T>(initialForm);
  const [formValidation, setFormValidation] = useState<ValidationState<T>>({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    return Object.values(formValidation).every((value) => value === null);
  }, [formValidation]);

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    // TypeScript no puede inferir las claves dinámicas, lo definimos como Record<string, string | null>
    const formCheckedValues: Record<string, string | null> = {};

    for (const formField of Object.keys(formValidations) as (keyof T)[]) {
      const [fn, errorMessage] = formValidations[formField]!;
      formCheckedValues[`${String(formField)}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    // casteamos al tipo correcto antes de guardarlo
    setFormValidation(formCheckedValues as ValidationState<T>);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
  };
}
