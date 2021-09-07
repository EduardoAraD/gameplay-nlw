import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

import { Category } from '../Category';
import { styles } from './styles';
import { categories } from '../../utils/categories';

type Props = {
  categorySelected: string;
  setCategory: (categoryId: string) => void;
}

export function CategorySelect({
  categorySelected,
  setCategory
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
      style={styles.container}
    >
      {categories.map(category => (
        <Category
          key={category.id}
          icon={category.icon}
          title={category.title}
          checked={category.id === categorySelected}
          onPress={() => setCategory(category.id)}
        />
      ))}
    </ScrollView>
  )
}