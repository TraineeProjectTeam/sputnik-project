import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Input, List, message, Modal, Select, Upload } from 'antd';
import { IProduct, useProductsStore } from 'entities/product';
import { useTranslation } from 'react-i18next';
import { GlobalSpin } from 'shared/ui/global-spin';
import { ProductCard } from 'shared/ui/product-card';
import { UploadOutlined } from '@ant-design/icons';
import { StyledList, StyledModalContent } from './products-vendor.styles';
import { getProductsVendorFields } from '../lib/products-vendor.lib';
import {
  IEditableProductField,
  IInitialValuesFields,
  TypeProductField,
} from '../model/products-vendor.types';
import { ICategory } from 'entities/category';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';

const renderFields = (
  field: IEditableProductField,
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void,
  onChangeCategory: (category: string) => void,
  onChangeFile: (info: UploadChangeParam<UploadFile>, type: TypeProductField) => void,
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
          onChange={(info) => onChangeFile(info, field.type)}
          showUploadList={{ showRemoveIcon: true }}
          maxCount={1}
          listType="picture-card"
          accept=".jpg,.png"
          defaultFileList={[
            {
              uid: '-1',
              name: field.value?.split('/').pop()?.split('.')[0] || '',
              status: 'done',
              url: field.value,
            },
          ]}
        >
          <Button icon={<UploadOutlined />} />
        </Upload>
      );

    case 'images':
      if (field.values && field.values.every((value) => typeof value === 'string')) {
        return (
          <Upload
            onChange={(info) => onChangeFile(info, field.type)}
            showUploadList={{ showRemoveIcon: true }}
            maxCount={2}
            listType="picture-card"
            accept=".jpg,.png"
            multiple
            defaultFileList={field.values.map((value, index) => ({
              uid: `-${index}`,
              name: value.split('/').pop()?.split('.')[0] || '',
              status: 'done',
              url: value.toString(),
            }))}
          >
            <Button icon={<UploadOutlined />} />
          </Upload>
        );
      } else {
        return null;
      }
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
    default:
      return null;
  }
};

export const ProductsVendorPage = () => {
  const { productsForVendor, isLoadingForVendor, updateProduct } = useProductsStore();
  const { t: tProduct } = useTranslation('product');
  const { t: tErr } = useTranslation('errors');
  const { t: tCategories } = useTranslation('categories');
  const [editableProduct, setEditableProduct] = useState<IProduct | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const productsVendorFields = getProductsVendorFields(
    tErr,
    tProduct,
    tCategories,
    editableProduct,
  );

  const initialValues: IInitialValuesFields = {
    name: editableProduct?.name,
    description: editableProduct?.description,
    category: editableProduct?.category && tCategories(editableProduct.category),
    price: editableProduct?.price,
    discountPrice: editableProduct?.discountPrice,
    thumbnail: editableProduct?.thumbnail,
    images: editableProduct?.images,
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (editableProduct) {
      setEditableProduct({ ...editableProduct, [name]: value });
    }
  };

  const handleSelectChange = (category: string) => {
    if (editableProduct) {
      setEditableProduct({ ...editableProduct, category });
    }
  };

  const onChangeFile = (info: UploadChangeParam<UploadFile>, type: TypeProductField) => {
    const { name, status } = info.file;

    if (editableProduct) {
      if (type === 'image') {
        setEditableProduct({
          ...editableProduct,
          thumbnail: info.fileList[0].url || '',
        });
      } else if (type === 'images') {
        setEditableProduct({
          ...editableProduct,
          images: info.fileList.map((file) => file.url || ''),
        });
      }

      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(tProduct('Файл загружен!', { fileName: name }));
      } else if (status === 'error') {
        message.error(tErr('Ошибка загрузки файла!', { fileName: name }));
      }
    }
  };

  const showModal = (product: IProduct) => {
    setEditableProduct(product);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setEditableProduct(null);
    setIsModalVisible(false);
  };

  const handleOk = () => {
    saveChanges();
  };

  const handleCancel = () => {
    form.resetFields();
    closeModal();
  };

  const handleClickCard = (product: IProduct) => {
    showModal(product);
  };

  const saveChanges = () => {
    form
      .validateFields()
      .then(() => {
        if (editableProduct) {
          updateProduct(editableProduct);
          closeModal();
        }
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  useEffect(() => {
    if (editableProduct) {
      form.setFieldsValue({
        name: editableProduct.name,
        description: editableProduct.description,
        category: tCategories(editableProduct.category),
        price: editableProduct.price,
        discountPrice: editableProduct.discountPrice,
        thumbnail: editableProduct.thumbnail,
        images: editableProduct.images,
      });
    }
  }, [editableProduct, form, tCategories]);

  if (isLoadingForVendor) {
    return <GlobalSpin size={'large'} />;
  }

  return (
    <>
      <h1>{tProduct('Список ваших продуктов')}</h1>
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
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form autoComplete="off" form={form} layout="vertical" initialValues={initialValues}>
                <StyledModalContent>
                  {productsVendorFields.map((field) => (
                    <Form.Item
                      label={field.label}
                      key={field.name}
                      name={field.name}
                      rules={field.rules}
                    >
                      {renderFields(field, handleInputChange, handleSelectChange, onChangeFile)}
                    </Form.Item>
                  ))}
                </StyledModalContent>
              </Form>
            </Modal>
          )}
        </>
      )}
    </>
  );
};
