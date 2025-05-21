import React from 'react';
import { List } from 'react-native-paper';
import { Product } from '../types/product';

export default function ProductItem({ item }: { item: Product }) {
  return (
    <List.Item
      title={`${item.name} (${item.quantity || 1}개)`}
      description={`개당 ${item.price.toLocaleString()}원`}
      left={props => <List.Icon {...props} icon="cart" />}
      right={props => (
        <List.Subheader {...props}>
          {(item.price * (item.quantity || 1)).toLocaleString()}원
        </List.Subheader>
      )}
    />
  );
}
