type PlansModelType = {
  id: string;
  name: string;
  description: string;
  configs: PlansModelConfigType;
  is_public: boolean | number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  created_by: string;
  updated_by: string;
  deleted_by: string;
};

type PlansModelConfigType = {
  user_tier: number;
  branch_limit: number;
  is_best_value: boolean;
  product_limit: number;
  monthly_price_rp: number;
  daily_transaction: number;
};
