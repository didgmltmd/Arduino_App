import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import {
  Text,
  Appbar,
  Button,
  Modal,
  Portal,
  List,
} from 'react-native-paper';
import ProductItem from '../components/ProductItem';
import { Product } from '../types/product';
import { useSocket } from '../hooks/useSocket';

export default function CartScreen() {
  const [items, setItems] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useSocket((newItem) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.name === newItem.name
      );

      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingIndex];
        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: (existingItem.quantity || 1) + 1,
        };
        return updatedItems;
      }

      return [...prevItems, { ...newItem, quantity: 1 }];
    });
  });


  const handleConfirm = () => {
    setItems([]);
    setModalVisible(false);
    alert('✅ 결제가 완료되었습니다!');
  }

  const total = items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  return (
    <View style={{ flex: 1 }}>
      {/* 헤더 */}
      <Appbar.Header>
        <Appbar.Content title="🛒 스마트카트" />
      </Appbar.Header>

      {/* 품목 리스트 */}
      <FlatList
        data={items}
        keyExtractor={(item, idx) => `${item.name}-${idx}`}
        renderItem={({ item }) => <ProductItem item={item} />}
      />

      {/* 총합 + 결제버튼 */}
      <View
        style={{
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant="titleLarge">총 합계: {total.toLocaleString()}원</Text>
        <Button mode="contained" onPress={() => setModalVisible(true)}>
          결제하기
        </Button>
      </View>

      {/* 모달 */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            margin: 20,
            borderRadius: 8,
          }}
        >
          <Text variant="titleLarge" style={{ marginBottom: 12 }}>
            🧾 주문 내역
          </Text>

          {items.map((item, idx) => (
            <Text key={idx} style={{ marginBottom: 4 }}>
              {item.name} x {item.quantity} ={' '}
              {(item.price * (item.quantity || 1)).toLocaleString()}원
            </Text>
          ))}

          <Text variant="titleMedium" style={{ marginTop: 12 }}>
            총 합계: {total.toLocaleString()}원
          </Text>

          <Button
            mode="contained"
            style={{ marginTop: 16 }}
            onPress={() => {
              handleConfirm();
            }}
          >
            결제 확인
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}
