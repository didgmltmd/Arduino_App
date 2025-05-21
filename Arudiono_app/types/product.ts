export type Product = {
  name: string;
  price: number;
  quantity?: number; // ✅ 수량 필드 추가 (선택적)
};
