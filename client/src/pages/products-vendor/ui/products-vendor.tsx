import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, List, message, Modal } from 'antd';
import { IProduct, useProductsStore } from 'entities/product';
import { useTranslation } from 'react-i18next';
import { GlobalSpin } from 'shared/ui/global-spin';
import { ProductCard } from 'shared/ui/product-card';
import { StyledList } from './products-vendor.styles';
import { getInitialEditableValues, getProductsVendorFields } from '../lib/products-vendor.lib';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { initialValuesAdding } from '../model/products-vendor.constant';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { addSingleFileRequest, deleteFileRequest } from 'entities/file';
import { currentForm } from './custom-form';

export const ProductsVendorPage = () => {
  const { productsForVendor, isLoadingForVendor, updateProduct, addProduct } = useProductsStore();
  const { t } = useTranslation();
  const [editableProduct, setEditableProduct] = useState<IProduct | null>(null);
  const [addedProduct, setAddedProduct] = useState<IProduct | null>(null);
  const [isModalEditableVisible, setModalEditableVisible] = useState(false);
  const [isModalAddedVisible, setModalAddedVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const fields = getProductsVendorFields(t, editableProduct || addedProduct);
  const initialEditableValues = getInitialEditableValues(editableProduct, t);
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
        message.success(t('Удалено фото продукта!'));
      })
      .catch(() => message.error(t('Не удалось удалить фото продукта!')));
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
        message.success(t('Удалено фото продукта!'));
      })
      .catch(() => message.error(t('Не удалось удалить фото продукта!')));
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
          message.success(t('Файл загружен!'));
        })
        .catch((error) => {
          onError(error);
          message.error(t('Ошибка загрузки файла!'));
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
          message.success(t('Файл загружен!'));
        })
        .catch((error) => {
          onError(error);
          message.error(t('Ошибка загрузки файла!'));
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
          console.log(addedProduct);
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
        category: t(editableProduct.category),
        price: editableProduct.price,
        discountPrice: editableProduct.discountPrice,
        thumbnail: editableProduct.thumbnail,
        images: editableProduct.images,
      });
    }
  }, [editableProduct, editForm, t]);

  if (isLoadingForVendor) {
    return <GlobalSpin size={'large'} />;
  }

  return (
    <>
      <h1>{t('Список ваших продуктов')}</h1>
      <Button onClick={() => handleButtonAddingModal(initialValuesAdding)}>
        {t('Добавление продукта')}
      </Button>
      {!productsForVendor.length ? (
        <h1>{t('У вас пока нет продуктов')}</h1>
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
              title={`${t('ID Продукта')} ${editableProduct._id}`}
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
              title={`${t('Добавление продукта')}`}
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
