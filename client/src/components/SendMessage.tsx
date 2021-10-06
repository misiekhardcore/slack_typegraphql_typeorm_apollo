import { useFormik } from "formik";
import React, { ChangeEvent, useState } from "react";
import { Input } from "semantic-ui-react";
import styled from "styled-components";
import { useCreateMessageMutation } from "../generated/graphql";

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
  /* background-color: #4e3a4c; */
`;

interface SendMessageProps {
  channelName: string;
  channelId: number;
}

export const SendMessage: React.FC<SendMessageProps> = ({
  channelName,
  channelId,
}) => {
  const [createMessage] = useCreateMessageMutation();
  const [placeholder, setPlaceholder] = useState(
    `Message #${channelName}`
  );

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
        await createMessage({
          variables: {
            createMessageMessageInput: {
              channelId,
              text: values.message,
            },
          },
        });
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
        placeholder={placeholder}
        type="text"
        name="message"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPlaceholder(`Message #${channelName}`);
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
