import { useFormik } from "formik";
import React, { ChangeEvent, useState } from "react";
import { Input } from "semantic-ui-react";
import styled from "styled-components";

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 1.5rem;
  /* background-color: #4e3a4c; */
`;

interface SendMessageProps {
  onSubmit: (message: string) => Promise<any>;
  placeholder: string;
}

export const SendMessage: React.FC<SendMessageProps> = ({
  onSubmit,
  placeholder,
}) => {
  const [pholder, setPlaceholder] = useState(`Message #${placeholder}`);

  const {
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    values,
    errors,
  } = useFormik({
    initialValues: { message: "" },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (!values.message) {
        setErrors({ message: "Field cannot be empty" });
        setPlaceholder("Field cannot be empty");
      } else {
        await onSubmit(values.message);
        setSubmitting(false);
        resetForm();
      }
    },
  });
  return (
    <SendMessageWrapper>
      <Input
        error={!!errors.message}
        fluid
        placeholder={pholder}
        type="text"
        name="message"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPlaceholder(`Message #${placeholder}`);
          handleChange(e);
        }}
        onBlur={handleBlur}
        value={values.message}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.code === "Enter" && !isSubmitting) {
            handleSubmit();
          }
        }}
      />
    </SendMessageWrapper>
  );
};
