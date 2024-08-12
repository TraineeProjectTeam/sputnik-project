import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Button, Form, FormInstance, Input, List, message, Modal, Select, Upload } from 'antd';
import { IProduct, useProductsStore } from 'entities/product';
import { useTranslation } from 'react-i18next';
import { GlobalSpin } from 'shared/ui/global-spin';
import { ProductCard } from 'shared/ui/product-card';
import { UploadOutlined } from '@ant-design/icons';
import { StyledList, StyledModalContent } from './products-vendor.styles';
import { getInitialEditableValues, getProductsVendorFields } from '../lib/products-vendor.lib';
import { IProductField } from '../model/products-vendor.types';
import { ICategory } from 'entities/category';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { initialValuesAdding } from '../model/products-vendor.constant';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { addSingleFileRequest, deleteFileRequest } from 'entities/file';

const currentForm = (
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

const renderFields = (
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

export const ProductsVendorPage = () => {
  const { productsForVendor, isLoadingForVendor, updateProduct, addProduct } = useProductsStore();
  const { t: tProduct } = useTranslation('product');
  const { t: tErr } = useTranslation('errors');
  const { t: tCategories } = useTranslation('categories');
  const [editableProduct, setEditableProduct] = useState<IProduct | null>(null);
  const [addedProduct, setAddedProduct] = useState<IProduct | null>(null);
  const [isModalEditableVisible, setModalEditableVisible] = useState(false);
  const [isModalAddedVisible, setModalAddedVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const fields = getProductsVendorFields(
    tErr,
    tProduct,
    tCategories,
    editableProduct || addedProduct,
  );
  const initialEditableValues = getInitialEditableValues(editableProduct, tProduct);
  const [fileListSingle, setFileListSignle] = useState<UploadFile[]>([]);
  const [fileListMulty, setFileListMulty] = useState<UploadFile[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (editableProduct) {
      setEditableProduct({
        ...editableProduct,
        [name]: value,
      });
    } else if (addedProduct) {
      setAddedProduct({
        ...addedProduct,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (category: string) => {
    if (editableProduct) {
      setEditableProduct({
        ...editableProduct,
        category,
      });
    } else if (addedProduct) {
      setAddedProduct({
        ...addedProduct,
        category,
      });
    }
  };

  const onChangeSingleFile = (info: UploadChangeParam<UploadFile>) => {
    setFileListSignle(info.fileList);
  };

  const onChangeMultyFile = (info: UploadChangeParam<UploadFile>) => {
    setFileListMulty(info.fileList);
  };

  const handleCancel = () => {
    if (editableProduct) {
      editForm.resetFields();
      setEditableProduct(null);
      setModalEditableVisible(false);
    } else if (addedProduct) {
      addForm.resetFields();
      setAddedProduct(null);
      setModalAddedVisible(false);
    }
    setFileListSignle([]);
    setFileListMulty([]);
  };

  const handleClickCard = (product: IProduct) => {
    setEditableProduct(product);

    setFileListSignle([
      {
        uid: product._id,
        name: product.thumbnail.split('/').pop()?.split('.')[0] || '',
        status: 'done',
        url: product.thumbnail,
      },
    ]);

    setFileListMulty(
      product.images.map((value) => ({
        uid: value,
        name: value.split('/').pop()?.split('.')[0] || '',
        status: 'done',
        url: value,
      })),
    );

    setModalEditableVisible(true);
  };

  const removeMultyFile = (file: UploadFile) => {
    deleteFileRequest(file.response.image_url.split('/').pop())
      .then((res) => {
        if (addedProduct) {
          setAddedProduct({
            ...addedProduct,
            images: addedProduct.images.filter((url) => url !== res.data.image_url),
          });
        } else if (editableProduct) {
          setEditableProduct({
            ...editableProduct,
            images: editableProduct.images.filter((url) => url !== res.data.image_url),
          });
        }
        message.success(tProduct('Удалено фото продукта!'));
      })
      .catch(() => message.error(tErr('Не удалось удалить фото продукта!')));
  };

  const removeSingleFile = (file: UploadFile) => {
    deleteFileRequest(file.response.image_url.split('/').pop())
      .then(() => {
        if (addedProduct) {
          setAddedProduct({
            ...addedProduct,
            thumbnail: '',
          });
        } else if (editableProduct) {
          setEditableProduct({
            ...editableProduct,
            thumbnail: '',
          });
        }
        message.success(tProduct('Удалено фото продукта!'));
      })
      .catch(() => message.error(tErr('Не удалось удалить фото продукта!')));
  };

  const uploadSingleFile = ({ file, onError, onSuccess }: UploadRequestOption) => {
    const formData = new FormData();

    formData.append('image', file);

    if (onSuccess && onError) {
      addSingleFileRequest(formData)
        .then((res) => {
          if (addedProduct) {
            setAddedProduct({ ...addedProduct, thumbnail: res.data.image_url });
          } else if (editableProduct) {
            setEditableProduct({ ...editableProduct, thumbnail: res.data.image_url });
          }
          onSuccess(res.data);
          message.success(tProduct('Файл загружен!'));
        })
        .catch((error) => {
          onError(error);
          message.error(tErr('Ошибка загрузки файла!'));
        });
    }
  };

  const uploadMultyFile = ({ file, onError, onSuccess }: UploadRequestOption) => {
    const formData = new FormData();

    formData.append('image', file);

    if (onSuccess && onError) {
      addSingleFileRequest(formData)
        .then((res) => {
          if (addedProduct) {
            setAddedProduct({
              ...addedProduct,
              images: [...addedProduct.images, res.data.image_url],
            });
          } else if (editableProduct) {
            setEditableProduct({
              ...editableProduct,
              images: [...editableProduct.images, res.data.image_url],
            });
          }
          onSuccess(res.data);
          message.success(tProduct('Файл загружен!'));
        })
        .catch((error) => {
          onError(error);
          message.error(tErr('Ошибка загрузки файла!'));
        });
    }
  };

  const handleButtonAddingModal = (product: IProduct) => {
    setAddedProduct(product);
    setModalAddedVisible(true);
  };

  const saveForm = () => {
    if (editableProduct) {
      editForm
        .validateFields()
        .then(() => {
          updateProduct(editableProduct);
          handleCancel();
        })
        .catch((errorInfo) => {
          console.log('Validation Failed:', errorInfo);
        });
    } else if (addedProduct) {
      addForm
        .validateFields()
        .then(() => {
          addProduct(addedProduct);
          handleCancel();
        })
        .catch((errorInfo) => {
          console.log('Validation Failed:', errorInfo);
        });
    }
  };

  useEffect(() => {
    if (editableProduct) {
      editForm.setFieldsValue({
        name: editableProduct.name,
        description: editableProduct.description,
        category: tCategories(editableProduct.category),
        price: editableProduct.price,
        discountPrice: editableProduct.discountPrice,
        thumbnail: editableProduct.thumbnail,
        images: editableProduct.images,
      });
    }
  }, [editableProduct, editForm, tCategories]);

  if (isLoadingForVendor) {
    return <GlobalSpin size={'large'} />;
  }

  return (
    <>
      <h1>{tProduct('Список ваших продуктов')}</h1>
      <Button onClick={() => handleButtonAddingModal(initialValuesAdding)}>
        {tProduct('Добавление продукта')}
      </Button>
      {!productsForVendor.length ? (
        <h1>{tProduct('У вас пока нет продуктов')}</h1>
      ) : (
        <>
          <StyledList>
            {productsForVendor.map((product) => (
              <List.Item key={product._id} onClick={() => handleClickCard(product)}>
                <ProductCard product={product} />
              </List.Item>
            ))}
          </StyledList>
          {editableProduct && (
            <Modal
              title={`${tProduct('ID Продукта')} ${editableProduct._id}`}
              open={isModalEditableVisible}
              onOk={saveForm}
              onCancel={handleCancel}
            >
              {currentForm(
                editForm,
                fields,
                initialEditableValues,
                fileListSingle,
                fileListMulty,
                handleInputChange,
                handleSelectChange,
                onChangeSingleFile,
                onChangeMultyFile,
                removeSingleFile,
                removeMultyFile,
                uploadSingleFile,
                uploadMultyFile,
              )}
            </Modal>
          )}
          {addedProduct && (
            <Modal
              open={isModalAddedVisible}
              onOk={saveForm}
              title={`${tProduct('Добавление продукта')}`}
              onCancel={handleCancel}
            >
              {currentForm(
                addForm,
                fields,
                initialValuesAdding,
                fileListSingle,
                fileListMulty,
                handleInputChange,
                handleSelectChange,
                onChangeSingleFile,
                onChangeMultyFile,
                removeSingleFile,
                removeMultyFile,
                uploadSingleFile,
                uploadMultyFile,
              )}
            </Modal>
          )}
        </>
      )}
    </>
  );
};
