import { Descriptions } from 'antd';
import { Item } from '../api/types';

export const renderAdditionalFields = (item: Item) => {
  const additionalFields = [];

  if (item.type === 'Недвижимость') {
    additionalFields.push(
      <Descriptions.Item label="Тип недвижимости" key="propertyType">{item.propertyType}</Descriptions.Item>,
      <Descriptions.Item label="Площадь" key="area">{item.area} м²</Descriptions.Item>,
      <Descriptions.Item label="Количество комнат" key="rooms">{item.rooms}</Descriptions.Item>,
      <Descriptions.Item label="Цена" key="price">{item.price} руб.</Descriptions.Item>
    );
  } else if (item.type === 'Авто') {
    additionalFields.push(
      <Descriptions.Item label="Марка" key="brand">{item.brand}</Descriptions.Item>,
      <Descriptions.Item label="Модель" key="model">{item.model}</Descriptions.Item>,
      <Descriptions.Item label="Год выпуска" key="year">{item.year}</Descriptions.Item>
    );
    if (item.mileage) {
      additionalFields.push(<Descriptions.Item label="Пробег" key="mileage">{item.mileage} км</Descriptions.Item>);
    }
  } else if (item.type === 'Услуги') {
    additionalFields.push(
      <Descriptions.Item label="Тип услуги" key="serviceType">{item.serviceType}</Descriptions.Item>,
      <Descriptions.Item label="Опыт работы" key="experience">{item.experience} лет</Descriptions.Item>,
      <Descriptions.Item label="Стоимость услуги" key="cost">{item.cost} руб.</Descriptions.Item>
    );
    if (item.workSchedule) {
      additionalFields.push(<Descriptions.Item label="График работы" key="workSchedule">{item.workSchedule}</Descriptions.Item>);
    }
  }

  return additionalFields;
};