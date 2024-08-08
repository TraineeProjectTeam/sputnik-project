import { ChangeEvent, useEffect, useState } from 'react';
import { Flex, Form, Input, List, message, Modal, Select, Upload } from 'antd';
import { IProduct, useProductsStore } from 'entities/product';
import { useTranslation } from 'react-i18next';
import { GlobalSpin } from 'shared/ui/global-spin';
import { ProductCard } from 'shared/ui/product-card';
import { StyledImg, StyledList, StyledModalContent } from './products-vendor.styles';
import { getProductsVendorFields } from '../lib/products-vendor.lib';
import { IEditableProductField, IInitialValuesFields } from '../model/products-vendor.types';
import { TFunction } from 'i18next';
import { ICategory } from 'entities/category';

const renderFields = (
  field: IEditableProductField,
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void,
  onChangeSelect: (category: string) => void,
  tProduct: TFunction,
  tErr: TFunction,
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
          fileList={[]}
          name={field.name}
          showUploadList={false}
          previewFile={undefined}
          onChange={(response) => {
            if (response.file.status !== 'uploading') {
              console.log(response.file, response.fileList);
            }
            if (response.file.status === 'done') {
              message.success(tProduct('Файл загружен!', { fileName: response.file.name }));
            } else if (response.file.status === 'error') {
              message.error(tErr('Ошибка загрузки файла!', { fileName: response.file.name }));
            }
          }}
        >
          <Flex wrap gap="middle">
            {Array.isArray(field.values) &&
            field.values.every((field) => typeof field === 'string') ? (
              field.values.map((file) => <StyledImg key={file} src={file} />)
            ) : (
              <StyledImg src={field.value?.toString()} />
            )}
          </Flex>
        </Upload>
      );
    case 'select':
      if (field.values && field.values.length) {
        return (
          <Select onChange={onChangeSelect}>
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

  const handleSelectChange = (value: string) => {
    if (editableProduct) {
      setEditableProduct({ ...editableProduct, category: value });
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
                      {renderFields(field, handleInputChange, handleSelectChange, tProduct, tErr)}
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
