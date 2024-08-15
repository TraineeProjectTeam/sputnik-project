import { Button, Input, Select, UploadFile } from 'antd';
import { IProductField } from '../model/products-vendor.types';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { ChangeEvent } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import Upload, { UploadChangeParam } from 'antd/es/upload';
import { ICategory } from 'entities/category';

export const renderFields = (
  fileListSingle: UploadFile[],
  fileListMulty: UploadFile[],
  field: IProductField,
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void,
  onChangeCategory: (category: string) => void,
  onChangeSingleFile: (info: UploadChangeParam<UploadFile>) => void,
  onChangeMultyFile: (info: UploadChangeParam<UploadFile>) => void,
  removeSingleFile: (file: UploadFile) => void,
  removeMultyFile: (file: UploadFile) => void,
  uploadSingleFile: ({ file, onError, onSuccess }: UploadRequestOption) => void,
  uploadMultyFile: ({ file, onError, onSuccess }: UploadRequestOption) => void,
) => {
  switch (field.type) {
    case 'text':
    case 'number':
      return (
        <Input type={field.type} value={field.value} name={field.name} onChange={onChangeInput} />
      );
    case 'image':
      return (
        <Upload
          onRemove={removeSingleFile}
          customRequest={uploadSingleFile}
          fileList={fileListSingle}
          onChange={onChangeSingleFile}
          showUploadList={{ showRemoveIcon: true }}
          maxCount={1}
          listType="picture-card"
          accept=".jpg,.png"
        >
          <Button icon={<UploadOutlined />} />
        </Upload>
      );

    case 'images':
      return (
        <Upload
          onRemove={removeMultyFile}
          customRequest={uploadMultyFile}
          fileList={fileListMulty}
          onChange={onChangeMultyFile}
          showUploadList={{ showRemoveIcon: true }}
          maxCount={2}
          listType="picture-card"
          accept=".jpg,.png"
          multiple
        >
          <Button icon={<UploadOutlined />} />
        </Upload>
      );
    case 'select':
      if (field.values && field.values.length) {
        return (
          <Select onChange={onChangeCategory} value={field.value}>
            {Object.values(field.values).map((category: ICategory) => (
              <Select.Option key={category.id} value={category.id}>
                {category.text}
              </Select.Option>
            ))}
          </Select>
        );
      } else {
        return null;
      }
  }
};
