import type { Category, CategoryTreeNode } from '../model/types';

// Преобразование плоского массива в дерево
export const buildCategoryTree = (
  categories: Category[],
): CategoryTreeNode[] => {
  const map = new Map<string, CategoryTreeNode>();
  const roots: CategoryTreeNode[] = [];

  // Узлы
  categories.forEach((category) => {
    map.set(category.id, { ...category, children: [] });
  });

  // Строим иерархию
  categories.forEach((category) => {
    const node = map.get(category.id);
    if (!node) return;

    if (category.parentId === null) {
      roots.push(node);
    } else {
      const parent = map.get(category.parentId);
      if (parent) {
        parent.children!.push(node);
      }
    }
  });

  return roots;
};

// Получить все категории определенного уровня
export const getCategoriesByLevel = (
  categories: Category[],
  level: number,
): Category[] => {
  return categories.filter((c) => c.level === level);
};

// Получить дочерние категории
export const getChildCategories = (
  categories: Category[],
  parentId: string,
): Category[] => {
  return categories.filter((c) => c.parentId === parentId);
};

// Поиск категории по имени (для добавления новых)
export const findCategoryByName = (
  categories: Category[],
  name: string,
): Category | undefined => {
  return categories.find((c) => c.name.toLowerCase() === name.toLowerCase());
};
