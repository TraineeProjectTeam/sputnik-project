import { Form, FormInstance, UploadFile } from 'antd';
import { IProductField } from '../model/products-vendor.types';
import { IProduct } from 'entities/product';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { StyledModalContent } from './products-vendor.styles';
import { ChangeEvent } from 'react';
import { renderFields } from './render-fields';

export const currentForm = (
  form: FormInstance,
  fields: IProductField[],
  initialValues:
    | IProduct
    | {
        name: string | undefined;
        description: string | undefined;
        category: string | undefined;
        price: number | undefined;
        discountPrice: number | undefined;
        thumbnail: string | undefined;
        images: string[] | undefined;
      },
  fileListSingle: UploadFile[],
  fileListMulty: UploadFile[],
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  handleSelectChange: (category: string) => void,
  onChangeSingleFile: (info: UploadChangeParam<UploadFile>) => void,
  onChangeMultyFile: (info: UploadChangeParam<UploadFile>) => void,
  removeSingleFile: (file: UploadFile) => void,
  removeMultyFile: (file: UploadFile) => void,
  uploadSingleFile: ({ file, onError, onSuccess }: UploadRequestOption) => void,
  uploadMultyFile: ({ file, onError, onSuccess }: UploadRequestOption) => void,
) => (
  <Form autoComplete="off" form={form} layout="vertical" initialValues={initialValues}>
    <StyledModalContent>
      {fields.map((field) => (
        <Form.Item label={field.label} key={field.name} name={field.name} rules={field.rules}>
          {renderFields(
            fileListSingle,
            fileListMulty,
            field,
            handleInputChange,
            handleSelectChange,
            onChangeSingleFile,
            onChangeMultyFile,
            removeSingleFile,
            removeMultyFile,
            uploadSingleFile,
            uploadMultyFile,
          )}
        </Form.Item>
      ))}
    </StyledModalContent>
  </Form>
);
