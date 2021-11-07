import { FetchResult } from '@apollo/client';
import { useFormik } from 'formik';
import React, { ChangeEvent, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Icon, Input } from 'semantic-ui-react';
import styled from 'styled-components';
import {
  CreateDirectMessageMutation,
  CreateMessageMutation,
} from '../generated/graphql';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 1.5rem;
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 0.5rem;
`;

const FIleAddWrapper = styled.div`
  border: 2px solid #256cb3df;
  color: #256cb3df;
  background-color: #256cb340;
  padding: 0.5rem 0.75rem;
  width: 100%;
  border-radius: 1rem;
  grid-column: 1 /-1;
  display: flex;
  justify-content: space-between;
  p {
    line-height: 1;
    margin-bottom: 0;
  }
`;

const Dropzone = styled.div`
  display: flex;
`;

interface SendMessageProps {
  onSubmit: (
    message: string | null,
    file: File | null
  ) => Promise<
    FetchResult<
      CreateDirectMessageMutation | CreateMessageMutation,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Record<string, any>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Record<string, any>
    >
  >;
  placeholder: string;
}

export const SendMessage: React.FC<SendMessageProps> = ({
  onSubmit,
  placeholder,
}) => {
  const [pholder, setPlaceholder] = useState(`Message ${placeholder}`);
  const [file, setFile] = useState<File | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files: File[]) => setFile(files[0]),
  });

  const {
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    values,
    errors,
  } = useFormik({
    initialValues: { message: '' },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (!values.message && !file) {
        setErrors({ message: 'Field cannot be empty' });
        setPlaceholder('Field cannot be empty');
      } else {
        await onSubmit(values.message, file);
        setSubmitting(false);
        setFile(null);
        resetForm();
      }
    },
  });
  return (
    <SendMessageWrapper>
      <Dropzone
        {...getRootProps({
          className: 'dropzone',
        })}
      >
        <Button>
          <input {...getInputProps()} />
          <Icon
            style={{ margin: 0 }}
            name="paperclip"
            color={file ? 'blue' : 'grey'}
          />
        </Button>
      </Dropzone>

      <Input
        error={!!errors.message}
        placeholder={pholder}
        type="text"
        name="message"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPlaceholder(`Message ${placeholder}`);
          handleChange(e);
        }}
        onBlur={handleBlur}
        value={values.message}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.code === 'Enter' && !isSubmitting) {
            handleSubmit();
          }
        }}
      />
      {file && (
        <FIleAddWrapper>
          <p>{file.name}</p>
          <Icon name="close" onClick={() => setFile(null)} />
        </FIleAddWrapper>
      )}
    </SendMessageWrapper>
  );
};
