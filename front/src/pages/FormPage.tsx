// src/pages/FormPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, message } from 'antd';
import MultiStepForm from '../components/forms/MultiStepForm';
import { createItem, updateItem } from '../api/api';
import { Item } from '../api/types';

const FormPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state as Item | undefined; // Данные объявления, если есть

  // Редактируем ли мы объявление
  const isEditMode = !!item;

  const onFinish = async (values: Item) => {
    setLoading(true);
    try {
      if (isEditMode && item?.id) {
        // Редактирование существующего
        await updateItem(item.id, values);
        message.success('Объявление успешно обновлено');
      } else {
        // Создание нового
        await createItem(values);
        message.success('Объявление успешно создано');
      }
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        message.error('Ошибка при сохранении объявления');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{isEditMode ? 'Редактирование объявления' : 'Создание объявления'}</h1>
      <MultiStepForm onFinish={onFinish} initialValues={item} />
    </div>
  );
};

export default FormPage;