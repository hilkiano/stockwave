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

type UserModelType = {
  id: string;
  user_id: string;
  email: string;
  avatar_url: string;
  display_name: string;
  phone_number: string;
  address: string;
  last_login: Date;
  store_id: string;
  store_branch_id: string;
  group_id: string;
  license_id: string;
  configs: UserConfigModelType; // TODO: Add user config type
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  created_by: string;
  updated_by: string;
  deleted_by: string;
};

type UserConfigModelType = {
  ui: {
    sidebar_collapsed: boolean;
  };
};

type StoreModelType = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  configs: any; // TODO: Add store config type
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  created_by: string;
  updated_by: string;
  deleted_by: string;
};

type StoreBranchModelType = {
  id: string;
  name: string;
  is_head_office: boolean;
  address: string;
  email: string;
  store_id: string;
  configs: any; // TODO: Add store branch config type
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  created_by: string;
  updated_by: string;
  deleted_by: string;
};

type LicenseModelType = {
  id: string;
  serial_number: string;
  status: "pending" | "failed" | "done";
  store_id: string;
  active_until: Date;
  created_at: Date;
  updated_at: Date;
};

type ProductModelType = {
  id: string;
  name: string;
  store_id: string;
  descriptions: string;
  status: "pending" | "done";
  configs: any; // TODO: Add store product config type
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  created_by: string;
  updated_by: string;
  deleted_by: string;
};
